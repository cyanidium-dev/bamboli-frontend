import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import {
  PhoneIcon,
  MailIcon,
  TelegramIcon,
  InstagramIcon,
  ThreadsIcon,
} from "@/components/shared/ui/Icons";
import { contactCards, onlineHours, type ContactCardKind } from "@/data/contacts";

const icons: Record<ContactCardKind, (props: { className?: string }) => React.ReactElement> = {
  phone: PhoneIcon,
  mail: MailIcon,
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  threads: ThreadsIcon,
};

export default function ContactCards() {
  return (
    <section className="bg-mist pt-4 pb-16 lg:pt-6 lg:pb-24">
      <Container>
        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((card) => {
              const Icon = icons[card.kind];
              return (
                <li key={card.kind}>
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 border border-line bg-surface p-5 transition hover:border-ink"
                  >
                    <Icon className="size-5 shrink-0" />
                    <span>
                      <span className="u-label block text-muted">{card.label}</span>
                      <span className="mt-1 block text-[15px]">{card.value}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-[13px] text-muted">{onlineHours}</p>
        </Reveal>
      </Container>
    </section>
  );
}
