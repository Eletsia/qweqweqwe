'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import supabase from '@/services/supabase';
import useAuthStore from '@/store/authStore';

export default function RegisterForm() {
  const { login } = useAuthStore();

  const formSchema = z
    .object({
      email: z.string().email({ message: '유효한 이메일을 입력해 주세요.' }),
      password: z.string().min(8, {
        message: '비밀번호는 8자 이상 입력해 주세요.',
      }),
      passwordConfirm: z.string().min(8, { message: '비밀번호를 다시 입력해 주세요.' }),
      nickname: z.string().min(2, { message: '닉네임은 최소 2자 이상 입력해 주세요.' }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['passwordConfirm'],
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { email, password, nickname } = data;

      const { data: registerData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nickname },
        },
      });

      if (error) {
        throw new Error(error.message || '회원가입 실패');
      }

      login(
        {
          email: registerData.user?.email,
          nickname: registerData.user?.user_metadata?.nickname || '',
        },
        // 아래 타입 오류 월요일 튜터님께 문의 예정..
        registerData.session?.access_token,
      );
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 오류 발생');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="example@exam.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">가입하기</Button>
      </form>
    </Form>
  );
}
