
import { supabase } from '@/integrations/supabase/client';
import { Class } from '@/data/models';
import { toast } from '@/components/ui/use-toast';

export const getClasses = async (): Promise<Class[]> => {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        departments (name)
      `)
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
    
    // Format data to match Class model
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      departmentId: item.department_id,
      department: item.departments?.name || '',
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

export const getClassesByDepartment = async (departmentId: string): Promise<Class[]> => {
  // Si 'all' est sélectionné, retourner toutes les classes
  if (departmentId === 'all') {
    return getClasses();
  }
  
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        departments (name)
      `)
      .eq('department_id', departmentId)
      .order('name');
    
    if (error) {
      console.error('Error fetching classes by department:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement des classes",
        description: error.message
      });
      throw error;
    }
    
    // Format data to match Class model
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      departmentId: item.department_id,
      department: item.departments?.name || '',
      studentCount: item.student_count,
      unit: item.unit,
      created_at: item.created_at,
      updated_at: item.updated_at
    }));
  } catch (error) {
    console.error('Error fetching classes by department:', error);
    return [];
  }
};

export const addClass = async (classData: { name: string; departmentId: string; studentCount: number; unit?: string }): Promise<Class | null> => {
  try {
    // Vérifier si l'utilisateur est connecté
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      console.error('Authentication error:', sessionError);
      toast({
        variant: "destructive",
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour effectuer cette action."
      });
      return null;
    }
    
    // Formatage des données pour correspondre à la structure de la table
    const formattedData = {
      name: classData.name,
      department_id: classData.departmentId,
      student_count: classData.studentCount,
      unit: classData.unit
    };
    
    const { data, error } = await supabase
      .from('classes')
      .insert(formattedData)
      .select(`
        *,
        departments (name)
      `)
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
    
    toast({
      title: "Classe ajoutée",
      description: `${classData.name} a été ajoutée avec succès.`
    });
    
    // Format response to match Class model
    return {
      id: data.id,
      name: data.name,
      departmentId: data.department_id,
      department: data.departments?.name || '',
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

export const updateClass = async (classData: { id: string; name: string; departmentId: string; studentCount: number; unit?: string }): Promise<Class | null> => {
  try {
    // Vérifier si l'utilisateur est connecté
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      console.error('Authentication error:', sessionError);
      toast({
        variant: "destructive",
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour effectuer cette action."
      });
      return null;
    }
    
    // Formatage des données pour correspondre à la structure de la table
    const formattedData = {
      name: classData.name,
      department_id: classData.departmentId,
      student_count: classData.studentCount,
      unit: classData.unit
    };
    
    const { data, error } = await supabase
      .from('classes')
      .update(formattedData)
      .eq('id', classData.id)
      .select(`
        *,
        departments (name)
      `)
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
    
    toast({
      title: "Classe mise à jour",
      description: `${classData.name} a été mise à jour avec succès.`
    });
    
    // Format response to match Class model
    return {
      id: data.id,
      name: data.name,
      departmentId: data.department_id,
      department: data.departments?.name || '',
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
    // Vérifier si l'utilisateur est connecté
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      console.error('Authentication error:', sessionError);
      toast({
        variant: "destructive",
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour effectuer cette action."
      });
      return;
    }
    
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
    
    toast({
      title: "Classe supprimée",
      description: "La classe a été supprimée avec succès."
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};
