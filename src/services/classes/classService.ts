import { supabase } from '@/integrations/supabase/client';
import { Class } from '@/data/models';
import { toast } from '@/components/ui/use-toast';

export const getClasses = async (): Promise<Class[]> => {
  try {
    console.log('Fetching classes from database...');
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching classes:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement des classes",
        description: error.message
      });
      throw error;
    }
    
    console.log('Classes fetched successfully:', data);
    
    // Format data to match Class model
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      departmentId: '', // Maintenu pour compatibilité
      studentCount: item.student_count,
      unit: item.unit,
      created_at: item.created_at,
      updated_at: item.updated_at
    }));
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
};

export const getClassById = async (id: string): Promise<Class | null> => {
  try {
    console.log(`Fetching class with ID: ${id}`);
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching class by ID:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement de la classe",
        description: error.message
      });
      throw error;
    }
    
    if (!data) {
      console.log(`No class found with ID: ${id}`);
      return null;
    }
    
    console.log('Class fetched successfully:', data);
    
    // Format data to match Class model
    return {
      id: data.id,
      name: data.name,
      departmentId: '', // Maintenu pour compatibilité
      studentCount: data.student_count,
      unit: data.unit,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  } catch (error) {
    console.error('Error fetching class by ID:', error);
    return null;
  }
};

export const getClassesByDepartment = async (departmentId: string): Promise<Class[]> => {
  // Comme nous avons supprimé les départements, cette fonction retourne toutes les classes
  return getClasses();
};

export const getClassesByTeacher = async (teacherId: string): Promise<Class[]> => {
  try {
    console.log(`Fetching classes for teacher with ID: ${teacherId}`);
    
    // Si l'ID de l'enseignant n'est pas un UUID valide
    if (!teacherId || typeof teacherId !== 'string' || teacherId.length < 10) {
      console.warn('Invalid teacher ID provided:', teacherId);
      return [];
    }
    
    const { data, error } = await supabase
      .from('teacher_classes')
      .select(`
        class_id,
        classes (*)
      `)
      .eq('teacher_id', teacherId);
    
    if (error) {
      console.error('Error fetching classes by teacher:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement des classes",
        description: error.message
      });
      throw error;
    }
    
    console.log('Teacher classes data:', data);
    
    // Format data to match Class model
    const classes = data
      .filter(item => item.classes) // Vérifier que classes existe
      .map(item => ({
        id: item.classes.id,
        name: item.classes.name,
        departmentId: '', // Maintenu pour compatibilité
        studentCount: item.classes.student_count,
        unit: item.classes.unit,
        created_at: item.classes.created_at,
        updated_at: item.classes.updated_at
      }));
      
    console.log('Formatted classes for teacher:', classes);
    return classes;
  } catch (error) {
    console.error('Error fetching classes by teacher:', error);
    return [];
  }
};

export const getTeacherClassesForReservation = async (teacherId: string): Promise<Class[]> => {
  try {
    console.log(`Getting classes for reservation, teacher ID: ${teacherId}`);
    
    // Si aucun enseignant n'est connecté ou si l'ID n'est pas valide
    if (!teacherId || teacherId === 'undefined') {
      console.log('No valid teacher ID provided, fetching all classes');
      return getClasses(); // Récupérer toutes les classes comme fallback
    }
    
    const teacherClasses = await getClassesByTeacher(teacherId);
    
    if (teacherClasses.length === 0) {
      console.log('No classes found for teacher, fetching all classes as fallback');
      return getClasses(); // Récupérer toutes les classes si l'enseignant n'a pas de classes assignées
    }
    
    console.log(`Found ${teacherClasses.length} classes for teacher`);
    return teacherClasses;
  } catch (error) {
    console.error('Error in getTeacherClassesForReservation:', error);
    // En cas d'erreur, récupérer toutes les classes
    console.log('Error occurred, fetching all classes as fallback');
    return getClasses();
  }
};

export const addTeacherClass = async (teacherId: string, classId: string): Promise<boolean> => {
  try {
    console.log(`Adding class ${classId} to teacher ${teacherId}`);
    
    // Vérifier si l'association existe déjà
    const { data: existingData, error: existingError } = await supabase
      .from('teacher_classes')
      .select('*')
      .eq('teacher_id', teacherId)
      .eq('class_id', classId)
      .maybeSingle();
    
    if (existingError) {
      console.error('Error checking existing teacher-class association:', existingError);
      throw existingError;
    }
    
    if (existingData) {
      console.log('This teacher-class association already exists');
      toast({
        title: "Information",
        description: "Cette classe est déjà assignée à cet enseignant."
      });
      return true;
    }
    
    const { error } = await supabase
      .from('teacher_classes')
      .insert({
        teacher_id: teacherId,
        class_id: classId
      });
    
    if (error) {
      console.error('Error adding teacher class:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'ajout de la classe",
        description: error.message
      });
      throw error;
    }
    
    console.log('Teacher-class association added successfully');
    toast({
      title: "Classe assignée",
      description: "La classe a été assignée à l'enseignant avec succès."
    });
    
    return true;
  } catch (error) {
    console.error('Error adding teacher class:', error);
    return false;
  }
};

export const removeClass = async (teacherId: string, classId: string): Promise<boolean> => {
  try {
    console.log(`Removing class ${classId} from teacher ${teacherId}`);
    
    const { error } = await supabase
      .from('teacher_classes')
      .delete()
      .eq('teacher_id', teacherId)
      .eq('class_id', classId);
    
    if (error) {
      console.error('Error removing class from teacher:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la suppression de la classe",
        description: error.message
      });
      throw error;
    }
    
    console.log('Teacher-class association removed successfully');
    toast({
      title: "Classe retirée",
      description: "La classe a été retirée de l'enseignant avec succès."
    });
    
    return true;
  } catch (error) {
    console.error('Error removing class from teacher:', error);
    return false;
  }
};

export const addClass = async (classData: { name: string; studentCount: number; unit?: string }): Promise<Class | null> => {
  try {
    console.log('Adding new class:', classData);
    
    // Formatage des données pour correspondre à la structure de la table
    const formattedData = {
      name: classData.name,
      student_count: classData.studentCount,
      unit: classData.unit
    };
    
    const { data, error } = await supabase
      .from('classes')
      .insert(formattedData)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding class:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'ajout de la classe",
        description: error.message
      });
      throw error;
    }
    
    console.log('Class added successfully:', data);
    toast({
      title: "Classe ajoutée",
      description: `${classData.name} a été ajoutée avec succès.`
    });
    
    // Format response to match Class model
    return {
      id: data.id,
      name: data.name,
      departmentId: '', // Maintenu pour compatibilité
      studentCount: data.student_count,
      unit: data.unit,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  } catch (error) {
    console.error('Error adding class:', error);
    throw error;
  }
};

export const updateClass = async (classData: { id: string; name: string; studentCount: number; unit?: string }): Promise<Class | null> => {
  try {
    console.log('Updating class:', classData);
    
    // Formatage des données pour correspondre à la structure de la table
    const formattedData = {
      name: classData.name,
      student_count: classData.studentCount,
      unit: classData.unit
    };
    
    const { data, error } = await supabase
      .from('classes')
      .update(formattedData)
      .eq('id', classData.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating class:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la mise à jour de la classe",
        description: error.message
      });
      throw error;
    }
    
    console.log('Class updated successfully:', data);
    toast({
      title: "Classe mise à jour",
      description: `${classData.name} a été mise à jour avec succès.`
    });
    
    // Format response to match Class model
    return {
      id: data.id,
      name: data.name,
      departmentId: '', // Maintenu pour compatibilité
      studentCount: data.student_count,
      unit: data.unit,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

export const deleteClass = async (id: string): Promise<void> => {
  try {
    console.log(`Deleting class with ID: ${id}`);
    
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting class:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la suppression de la classe",
        description: error.message
      });
      throw error;
    }
    
    console.log('Class deleted successfully');
    toast({
      title: "Classe supprimée",
      description: "La classe a été supprimée avec succès."
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};
