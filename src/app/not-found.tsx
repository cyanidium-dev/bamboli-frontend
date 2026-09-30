import Button from "@/components/shared/ui/Button";
import Container from "@/components/shared/ui/Container";
import EmptyState from "@/components/shared/ui/EmptyState";
import { uiText } from "@/data/uiText";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center py-24">
      <EmptyState
        as="h1"
        eyebrow="404"
        title="Сторінку не знайдено"
        text="Можливо, товар уже розібрали або адреса змінилась."
        action={
          <Button variant="text-link" href="/catalog">
            {uiText.nav.toCatalog}
          </Button>
        }
      />
    </Container>
  );
}
