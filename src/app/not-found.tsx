import Button from "@/components/shared/ui/Button";
import Container from "@/components/shared/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
      <p className="u-label mb-5 text-muted">404</p>
      <h1 className="u-h1 mb-5">
        Сторінку не знайдено
      </h1>
      <p className="u-body mb-9 max-w-[380px]">
        Можливо, товар уже розібрали або адреса змінилась.
      </p>
      <Button variant="text-link" href="/catalog">
        До каталогу
      </Button>
    </Container>
  );
}
