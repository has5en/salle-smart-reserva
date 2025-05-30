
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getUsersByDepartment } from '@/services/users/profileService';
import { getUsersByRole } from '@/services/users/userService';
import { User } from '@/data/models';

interface UserManagementTableProps {
  userRole: 'admin' | 'teacher' | 'supervisor';
  department?: string;
}

const UserManagementTable = ({ userRole, department }: UserManagementTableProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // If department is specified, filter users by department
        if (department && department !== '') {
          const departmentUsers = await getUsersByDepartment(department);
          // Cast the result to User[] since it matches our updated User interface
          setUsers(departmentUsers as User[]);
        } else {
          // Fetch users by role
          const roleUsers = await getUsersByRole(userRole);
          // Cast the result to User[] since it matches our updated User interface
          setUsers(roleUsers as User[]);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userRole, department]);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  return (
    <Table>
      <TableCaption>Liste des utilisateurs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rôle</TableHead>
          {userRole === 'teacher' && <TableHead>Département</TableHead>}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={userRole === 'teacher' ? 5 : 4} className="text-center">
              Aucun utilisateur trouvé.
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.full_name || user.name || 'Non défini'}</TableCell>
              <TableCell>{user.email || 'Non défini'}</TableCell>
              <TableCell>{user.role}</TableCell>
              {userRole === 'teacher' && <TableCell>{user.department || 'Non assigné'}</TableCell>}
              <TableCell>
                {/* Actions buttons would go here */}
                <button className="text-primary">Éditer</button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default UserManagementTable;
