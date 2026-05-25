import { AppleIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export function SocialButtons({ verb = "Log In" }: { verb?: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[12px] text-muted">Or with</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <Button variant="outline" fullWidth type="button">
        <GoogleIcon />
        {verb} With Google
      </Button>
      <Button variant="outline" fullWidth type="button">
        <AppleIcon className="text-white" />
        {verb} With Apple
      </Button>
    </div>
  );
}
