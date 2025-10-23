import { dot } from "../styles/variants";
import type { SessionDotState } from "../types/timer.types";

type SessionDotProps = {
  status?: SessionDotState;
};

export default function SessionDot({ status = "default" }: SessionDotProps) {
  return (
    <li>
      <div className={dot({ status })} />
    </li>
  );
}
