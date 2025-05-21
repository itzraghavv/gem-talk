"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { LogInSchema, LoginFormData } from "@/lib/validator";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();

  const { auth, loading, error } = useAuth("login");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LogInSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    const { error, data } = await auth(formData.email, formData.password);

    if (error) {
      toast(error.message);
    } else {
      toast("Login Success!");
      router.push(`/dashboard/${data.user?.user_metadata.username}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label className="text-primary pb-2" htmlFor="picture">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="jhondoe@example.com"
          {...register("email")}
          className="bg-[#6E59A5]/20 border-[#7E69AB]  placeholder:text-[#8E9196] focus:ring-[#9b87f5]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <label className="text-primary pb-2" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password")}
          className="bg-[#6E59A5]/20 border-[#7E69AB]  placeholder:text-[#8E9196] focus:ring-[#9b87f5]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Button
          disabled={loading}
          className="bg-purple-600  px-4 py-2 rounded w-full"
        >
          {loading ? "Signing in..." : "Login"}
        </Button>
        <p className="text-center text-sm text-[#8E9196]">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-[#9b87f5]"
          >
            Register Here
          </Link>
        </p>
      </form>
    </div>
  );
}
