import { User, Mail, Lock } from "lucide-react";
import { Link } from "react-router";

import github from "@assets/auth/github.svg";
import google from "@assets/auth/google.svg";
import kakao from "@assets/auth/kakao.svg";
import Button from "@components/Button";
import Input from "@components/Input";
import { loginWithOAuth } from "@features/auth/api/loginWithOAuth";

export default function Login() {
  return (
    <section className="flex min-h-0 flex-1 basis-0 flex-col items-center justify-center gap-6 self-stretch">
      <header className="flex flex-col items-center justify-center gap-5">
        <div className="bg-wh/15 dark:bg-bl/20 flex h-15 w-15 items-center justify-center rounded-full">
          <User width={32} height={32} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="heading-text-s">다시 만나 반가워요</h3>
          <p className="label-text-s">로그인하고 집중을 이어가세요</p>
        </div>
      </header>
      <form className="flex max-w-md flex-col justify-center gap-4">
        <div>
          <label htmlFor="email" className="label-text-xs">
            이메일
          </label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            Icon={{
              Component: Mail,
              align: "left",
            }}
          />
        </div>
        <div>
          <label htmlFor="password" className="label-text-xs">
            비밀번호
          </label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            Icon={{ Component: Lock, align: "left" }}
          />
        </div>
        <Button type="submit" intent="primary" className="w-100">
          로그인
        </Button>
      </form>
      <div className="flex w-full items-center gap-2 px-4">
        <hr className="border-wh/60 dark:border-wh/40 flex-1 border-t" />
        <span className="label-text-xs">간편하게 시작하기</span>
        <hr className="border-wh/60 dark:border-wh/40 flex-1 border-t" />
      </div>
      <div className="flex gap-2">
        <Button
          shape="circle"
          composition="iconOnly"
          intent="subtle"
          className="h-10 w-10"
          onClick={() => void loginWithOAuth("google")}
        >
          <img src={google} alt="Google 로그인" />
        </Button>
        <Button
          shape="circle"
          composition="iconOnly"
          intent="subtle"
          className="h-10 w-10"
          onClick={() => void loginWithOAuth("kakao")}
        >
          <img src={kakao} alt="Kakao 로그인" />
        </Button>
        <Button
          shape="circle"
          composition="iconOnly"
          intent="subtle"
          className="h-10 w-10"
          onClick={() => void loginWithOAuth("github")}
        >
          <img src={github} alt="GitHub 로그인" />
        </Button>
      </div>
      <p className="label-text-s flex gap-1 opacity-90">
        아직 계정이 없으신가요?
        <Link to="/signup">
          <span className="font-bold hover:underline">회원가입</span>
        </Link>
      </p>
    </section>
  );
}
