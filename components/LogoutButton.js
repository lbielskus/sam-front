import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');

    router.push('/login');

    toast.success('Logged out successfully');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
