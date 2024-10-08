'use client';

import FormErrorTextMessage from '@/components/common/form-error-text-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string, type InferType } from 'yup';
import { config } from '@/services/web3/WagmiConfig';
import { useAccount } from 'wagmi';
import { Account } from './account';
const loginFormSchema = object({
  id: string().required('This field is required'),
  password: string().required('Password is required'),
}).required();

type FormData = InferType<typeof loginFormSchema>;
const AdminLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const { isConnected } = useAccount();

  return (
    <div className="space-y-8">
      {isConnected ? <Account /> : <w3m-connect-button />}
    </div>
  );
};

export default AdminLoginForm;
