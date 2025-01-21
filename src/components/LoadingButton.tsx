import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const LoadingButton = () => {
  return(
    <Button disabled>
      {/* The classname for the loader is for animations */}
      <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
      Loading
    </Button>
  )
}

export default LoadingButton;