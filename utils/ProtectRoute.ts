import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';

const ProtectRoute = (WrappedComponent: NextPage<any>) => {};

export default ProtectRoute;
