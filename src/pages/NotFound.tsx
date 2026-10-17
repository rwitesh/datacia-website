import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFoundPage() {
  return (
    <Container className="py-32 text-center sm:py-44">
      <Reveal immediate>
        <p className="font-mono text-sm text-subtle-foreground">404</p>
        <h1 className="text-display mt-4 text-5xl sm:text-6xl">This page doesn't exist.</h1>
        <p className="mt-6 text-lg text-muted-foreground">It may have moved, or the link may be out of date.</p>
        <Link to="/" className={`${buttonVariants({ variant: "secondary", size: "lg" })} mt-10`}>
          Back to home
        </Link>
      </Reveal>
    </Container>
  );
}
