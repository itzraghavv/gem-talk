"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { RegisterSchema, RegisterFormData } from "@/lib/validator";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { auth, loading } = useAuth("register");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { error } = await auth(data.email, data.password, data.username);

    if (error) {
      toast("Registration Failed");
    } else {
      toast("Account Created");
      router.push("/login");
    }
  };
  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label className="text-primary pb-2" htmlFor="username">
          Username
        </label>
        <Input
          id="username"
          type="username"
          placeholder="Jhon Doe"
          value={username}
          {...register("username")}
          className="bg-[#6E59A5]/20 border-[#7E69AB]  placeholder:text-[#8E9196] focus:ring-[#9b87f5]"
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && (
          <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
        )}
        <label className="text-primary pb-2" htmlFor="picture">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="jhondoe@example.com"
          value={email}
          {...register("email")}
          className="bg-[#6E59A5]/20 border-[#7E69AB]  placeholder:text-[#8E9196] focus:ring-[#9b87f5]"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
        <label className="text-primary pb-2" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          {...register("password")}
          className="bg-[#6E59A5]/20 border-[#7E69AB]  placeholder:text-[#8E9196] focus:ring-[#9b87f5]"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
        <Button
          disabled={loading}
          className="bg-purple-600  px-4 py-2 rounded w-full"
        >
          {loading ? "Signing up..." : "Register"}
        </Button>
        <p className="text-center text-sm text-[#8E9196]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-[#9b87f5]"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
