import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import AdminLoginForm from './components/admin-login-form';
  const AdminLoginPage = () => {
    return (
      <main className="grid min-h-[calc(100vh_-_72px)] place-items-center">
        <Card className="mx-auto w-11/12 max-w-[526px] md:p-8">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="font-serif text-xl font-light text-primary md:text-[32px] md:leading-[35px]">
              Admin SignIn
            </CardTitle>
            <CardDescription className="font-dmSans text-sm font-normal text-[#667085]">
              Connect Your Wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLoginForm />
          </CardContent>
          {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
        </Card>
      </main>
    );
  };
  
  export default AdminLoginPage;
  