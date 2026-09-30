"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { FREE_SHIPPING_FROM, useCartStore } from "@/store/cartStore";
import { cn, formatPrice } from "@/lib/utils";
import { ChevronIcon } from "@/components/shared/ui/Icons";
import Button from "@/components/shared/ui/Button";
import PageHeading from "@/components/shared/ui/PageHeading";
import Field, { fieldControl } from "@/components/shared/ui/Field";

interface Fields {
  name: string;
  phone: string;
  city: string;
  branch: string;
  street: string;
  house: string;
  apartment: string;
  comment: string;
}

const empty: Fields = {
  name: "",
  phone: "",
  city: "",
  branch: "",
  street: "",
  house: "",
  apartment: "",
  comment: "",
};

type DeliveryMethod = "branch" | "courier";
type PaymentMethod = "online" | "cod";

const deliveryOptions: { value: DeliveryMethod; title: string; text: string }[] = [
  {
    value: "branch",
    title: "Відділення / поштомат",
    text: "Нова Пошта, забираєте у відділенні або поштоматі",
  },
  {
    value: "courier",
    title: "Кур'єрська доставка",
    text: "Нова Пошта привезе за вашою адресою",
  },
];

const paymentOptions: { value: PaymentMethod; title: string; text: string }[] = [
  {
    value: "online",
    title: "Оплата на сайті",
    text: "Карткою онлайн після підтвердження замовлення",
  },
  {
    value: "cod",
    title: "Накладений платіж",
    text: "Оплата під час отримання на Новій Пошті",
  },
];

export default function CheckoutView() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState<Fields>(empty);
  const [delivery, setDelivery] = useState<DeliveryMethod>("branch");
  const [payment, setPayment] = useState<PaymentMethod>("online");
  const [itemsOpen, setItemsOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => setMounted(true), []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : 90;

  const invalid = {
    name: fields.name.trim().length < 2,
    phone: fields.phone.replace(/\D/g, "").length < 10,
    city: fields.city.trim().length < 2,
    branch: delivery === "branch" && fields.branch.trim().length < 1,
    street: delivery === "courier" && fields.street.trim().length < 2,
    house: delivery === "courier" && fields.house.trim().length < 1,
  };
  const hasErrors = Object.values(invalid).some(Boolean);

  const set = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (hasErrors) return;
    // Demo build: no backend yet. Swap this for the order endpoint later.
    setDone(true);
    clear();
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[440px] py-24 text-center"
      >
        <p className="u-label mb-5 text-muted">Замовлення прийнято</p>
        <h1 className="u-h1 mb-5">Дякуємо!</h1>
        <p className="u-body mb-9">
          Це демонстраційна версія магазину, тож замовлення нікуди не
          надсилається. У бойовій версії тут буде номер замовлення й лист на
          пошту.
        </p>
        <Button variant="text-link" href="/catalog">
          Повернутись до каталогу
        </Button>
      </motion.div>
    );
  }

  if (mounted && items.length === 0) {
    return (
      <div className="mx-auto max-w-[420px] py-24 text-center">
        <h1 className="u-h1 mb-5">Кошик порожній</h1>
        <p className="u-body mb-9">
          Додайте щось із каталогу, щоб оформити замовлення.
        </p>
        <Button variant="text-link" href="/catalog">
          До каталогу
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHeading title="Оформлення" className="mb-10 lg:mb-14" />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <form onSubmit={submit} noValidate>
          <p className="u-label mb-6 text-ink">Отримувач</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Імʼя та прізвище"
              value={fields.name}
              onChange={set("name")}
              invalid={touched && invalid.name}
              hint="Вкажіть імʼя та прізвище"
            />
            <TextField
              label="Телефон"
              value={fields.phone}
              onChange={set("phone")}
              invalid={touched && invalid.phone}
              hint="Мінімум 10 цифр"
              inputMode="tel"
              placeholder="+38 0__ ___ __ __"
            />
          </div>

          <p className="u-label mb-6 mt-12 text-ink">Доставка</p>
          <OptionGroup
            name="delivery"
            legend="Спосіб доставки"
            options={deliveryOptions}
            value={delivery}
            onChange={setDelivery}
          />
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <TextField
              label="Місто"
              value={fields.city}
              onChange={set("city")}
              invalid={touched && invalid.city}
              hint="Вкажіть місто"
            />
            {delivery === "branch" ? (
              <TextField
                label="Відділення або поштомат"
                value={fields.branch}
                onChange={set("branch")}
                invalid={touched && invalid.branch}
                hint="Вкажіть відділення або поштомат"
              />
            ) : (
              <TextField
                label="Вулиця"
                value={fields.street}
                onChange={set("street")}
                invalid={touched && invalid.street}
                hint="Вкажіть вулицю"
              />
            )}
            {delivery === "courier" && (
              <>
                <TextField
                  label="Будинок"
                  value={fields.house}
                  onChange={set("house")}
                  invalid={touched && invalid.house}
                  hint="Вкажіть номер будинку"
                />
                <TextField
                  label="Квартира (за наявності)"
                  value={fields.apartment}
                  onChange={set("apartment")}
                  invalid={false}
                  hint=""
                />
              </>
            )}
          </div>

          <p className="u-label mb-6 mt-12 text-ink">Оплата</p>
          <OptionGroup
            name="payment"
            legend="Спосіб оплати"
            options={paymentOptions}
            value={payment}
            onChange={setPayment}
          />

          <Field label="Коментар до замовлення" on="white" className="mt-5">
            <textarea
              value={fields.comment}
              onChange={set("comment")}
              rows={3}
              className={fieldControl({ on: "white", className: "resize-none" })}
            />
          </Field>

          <Button type="submit" className="mt-10 w-full lg:w-auto lg:px-14">
            Підтвердити замовлення
          </Button>
        </form>

        <aside className="order-first lg:sticky lg:top-[110px] lg:order-none lg:self-start">
          <div className="mb-4 flex flex-col items-end gap-1 lg:mb-6">
            <p className="u-label self-start text-ink">Ваше замовлення</p>
            {/* Below lg the summary sits above the form; the list folds away. */}
            <button
              type="button"
              onClick={() => setItemsOpen((open) => !open)}
              aria-expanded={itemsOpen}
              className="flex items-center gap-1.5 py-1 text-[12px] lg:hidden"
            >
              {itemsOpen ? "Сховати товари" : "Показати товари"}
              <ChevronIcon
                className={cn(
                  "size-4 transition-transform duration-300",
                  itemsOpen && "rotate-180",
                )}
              />
            </button>
          </div>
          {/* Below lg the list slides open/closed (0fr → 1fr); at lg it is always open. */}
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:grid-rows-[1fr] lg:opacity-100",
              itemsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <ul className="mb-5 divide-y divide-line border-y border-line">
                {mounted &&
                  items.map((item) => (
                    <li key={item.key} className="flex gap-4 py-4">
                      <div className="relative aspect-3/4 w-[64px] shrink-0 overflow-hidden bg-sand">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="u-label">{item.title}</p>
                        <p className="u-caption mt-1.5">
                          {item.colorName}
                          {item.size ? ` · ${item.size}` : ""} · {item.quantity} шт
                        </p>
                        <span className="mt-auto text-[13px] tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <dl className="space-y-2 text-[12px]">
            <div className="flex justify-between">
              <dt>Сума</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Доставка</dt>
              <dd className="tabular-nums">
                {shipping === 0 ? "Безкоштовно" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-[15px] font-semibold">
              <dt>Разом</dt>
              <dd className="tabular-nums">{formatPrice(subtotal + shipping)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}

function TextField({
  label,
  value,
  onChange,
  invalid,
  hint,
  inputMode,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  hint: string;
  inputMode?: "tel" | "text";
  placeholder?: string;
}) {
  return (
    // The error floats out of flow, so showing it never shifts the fields below.
    <Field label={label} error={invalid ? hint : undefined} on="white" floatingError>
      <input
        type="text"
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={invalid}
        className={fieldControl({ invalid, on: "white" })}
      />
    </Field>
  );
}

function OptionGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: { value: T; title: string; text: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer gap-3 border p-4 transition focus-within:border-ink",
                selected ? "border-ink" : "border-ink/40 hover:border-ink",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
                  selected ? "border-ink" : "border-ink/40",
                )}
              >
                {selected && <span className="size-2 rounded-full bg-ink" />}
              </span>
              <span className="min-w-0">
                <span className="u-label block">{option.title}</span>
                <span className="u-caption mt-1.5 block leading-snug">
                  {option.text}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
