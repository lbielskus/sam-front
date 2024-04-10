import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';

interface Order {
  _id: string;
  paid: boolean;
  email: string;
}

const UserProfile = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (session && session.user && session.user.email) {
          const email = session.user.email;
          const res = await axios.get<Order[]>(
            `/api/user-orders?email=${email}`
          );
          setOrders(res.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [session]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col justify-center items-center sm:w-full md:w-2/5 h-full p-16'>
        {session && session.user && (
          <>
            <h3 className='mb-4 text-2xl text-center md:text-left'>
              Hello, {session.user.fullName || ''} !
            </h3>
            <h5 className='mb-4 text-slateblue'>{session.user.email}</h5>
            <div className='bg-third my-2 rounded-md py-2 px-2 text-gray-300 border-2 border-primary '>
              <h2 className='mb-4 mt-6'>Your Orders:</h2>
              {orders.length > 0 ? (
                <ul>
                  {orders.map((order) => (
                    <li
                      key={order._id}
                      className='mb-4 border border-solid border-gray-400 rounded px-3 py-3 '
                    >
                      <p>Order ID: {order._id}</p>
                      <p>Paid: {order.paid ? 'Yes' : 'No'}</p>
                      <p>Email: {order.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='px-3 py-3 mb-5 border border-solid border-gray-400 rounded'>
                  <p className='pb-3 '>No orders found.</p>
                </div>
              )}
            </div>
            <button
              className=' bg-third hover:bg-hover3 text-gray-300 font-bold py-2 px-4 rounded'
              onClick={handleSignOut}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
