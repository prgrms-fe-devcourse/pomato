import type { SessionDotState } from "../types/timer.types";
import { dot } from "../variants";

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
