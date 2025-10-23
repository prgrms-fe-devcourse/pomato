import { User, Mail, Lock, AtSign } from "lucide-react";

import Button from "@components/Button";
import Input from "@components/Input";

export default function SignupStatic() {
  return (
    <section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 overflow-y-auto px-4 py-8 sm:gap-6 sm:px-6 sm:py-10 md:gap-8 md:px-8 md:py-12">
      <header className="flex flex-col items-center justify-center gap-4 sm:gap-5">
        <div className="bg-wh/15 dark:bg-bl/20 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16 md:h-18 md:w-18">
          <User width={28} height={28} className="sm:h-8 sm:w-8" />
        </div>
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <h3 className="heading-text-xs sm:heading-text-s md:heading-text-m text-center">
            환영합니다
          </h3>
          <p className="label-text-xs sm:label-text-s text-center opacity-90">
            회원가입 후 함께 집중을 시작해요
          </p>
        </div>
      </header>

      <form
        action="#"
        method="post"
        className="flex w-full max-w-[320px] flex-col justify-center gap-3.5 sm:max-w-md sm:gap-4"
        noValidate
      >
        <div className="space-y-1.5">
          <label htmlFor="displayName" className="label-text-xs">
            닉네임
          </label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            placeholder="닉네임을 입력해주세요"
            Icon={{ Component: User, align: "left" }}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="username" className="label-text-xs">
            아이디
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="아이디를 입력해주세요"
            Icon={{ Component: AtSign, align: "left" }}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="label-text-xs">
            이메일
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            Icon={{ Component: Mail, align: "left" }}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="label-text-xs">
            비밀번호
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            Icon={{ Component: Lock, align: "left" }}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="label-text-xs">
            비밀번호 확인
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            Icon={{ Component: Lock, align: "left" }}
          />
        </div>

        <Button type="submit" intent="primary" className="h-10 w-full sm:h-11">
          회원가입
        </Button>
      </form>

      <p className="label-text-xs sm:label-text-s flex gap-1 opacity-90">
        이미 계정이 있으신가요?
        <a href="/login" className="font-bold hover:underline">
          로그인
        </a>
      </p>
    </section>
  );
}
