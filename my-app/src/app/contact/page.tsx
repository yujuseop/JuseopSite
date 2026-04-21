import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <header className="mb-8 text-center space-y-2">
        <h1 className="text-2xl font-bold lg:text-3xl">연락하기</h1>
        <p className="text-sm text-muted-foreground lg:text-base">
          협업 제안, 질문, 피드백 모두 환영합니다.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
