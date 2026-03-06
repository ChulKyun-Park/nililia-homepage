"use client";

import { useState, useCallback } from "react";

const FIELD_OPTIONS = [
  { value: "", label: "분야를 선택해 주세요" },
  { value: "OTT", label: "OTT" },
  { value: "게임", label: "게임" },
  { value: "영상", label: "영상" },
  { value: "문서", label: "문서" },
  { value: "웹/앱", label: "웹/앱" },
  { value: "웹소설/웹툰", label: "웹소설/웹툰" },
  { value: "SDH/배리어프리", label: "SDH/배리어프리" },
  { value: "기타", label: "기타" },
];

const WORK_TYPE_OPTIONS = [
  { value: "", label: "유형을 선택해 주세요" },
  { value: "정기납품", label: "정기납품" },
  { value: "1회성 프로젝트", label: "1회성 프로젝트" },
  { value: "미정", label: "미정" },
];

const PRIVACY_POLICY_TEXT = `회사명(이하 '회사'라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.

제1조 (개인정보의 처리목적)
회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

1. 프로젝트 상담 및 견적 제공
2. 서비스 안내 및 상담
3. 마케팅 및 광고에의 활용`;

const inputClass =
  "block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export default function ContactForm() {
  const [organization, setOrganization] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [field, setField] = useState("");
  const [workType, setWorkType] = useState("");
  const [message, setMessage] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const resetForm = useCallback(() => {
    setOrganization("");
    setContactName("");
    setEmail("");
    setPhone("");
    setField("");
    setWorkType("");
    setMessage("");
    setPrivacyConsent(false);
    setError("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess(false);

      if (
        !organization.trim() ||
        !contactName.trim() ||
        !email.trim() ||
        !phone.trim()
      ) {
        setError("필수 항목을 모두 입력해 주세요.");
        return;
      }

      if (!privacyConsent) {
        setError("개인정보 수집 및 이용에 동의해 주세요.");
        return;
      }

      setLoading(true);

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            organization: organization.trim(),
            contactName: contactName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            field,
            workType,
            message: message.trim(),
            privacyConsent,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "요청 처리 중 오류가 발생했습니다.");
          return;
        }

        setSuccess(true);
        resetForm();
      } catch {
        setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    },
    [organization, contactName, email, phone, field, workType, message, privacyConsent, resetForm],
  );

  if (success) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-foreground">문의가 접수되었습니다</h3>
        <p className="mt-2 text-sm text-muted">
          영업일 기준 1일 이내에 답변드리겠습니다.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-foreground">
            소속기관명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="(주)회사이름"
            className={`mt-2 ${inputClass}`}
            required
          />
        </div>
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-foreground">
            담당자명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="홍길동"
            className={`mt-2 ${inputClass}`}
            required
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-foreground">
            담당자 메일주소 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className={`mt-2 ${inputClass}`}
            required
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground">
            담당자 연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="contact-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-1234-5678"
            className={`mt-2 ${inputClass}`}
            required
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="field" className="block text-sm font-medium text-foreground">
            로컬리제이션 분야
          </label>
          <select
            id="field"
            value={field}
            onChange={(e) => setField(e.target.value)}
            className={`mt-2 ${inputClass}`}
          >
            {FIELD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="workType" className="block text-sm font-medium text-foreground">
            정기 작업 유무
          </label>
          <select
            id="workType"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className={`mt-2 ${inputClass}`}
          >
            {WORK_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground">
          상담 내용
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="프로젝트에 대해 자세히 알려주세요. (언어 페어, 물량, 일정 등)"
          className={`mt-2 ${inputClass} resize-none`}
        />
      </div>

      {/* 개인정보 수집 동의 */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 max-h-[120px] overflow-y-auto rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted">
          {PRIVACY_POLICY_TEXT}
        </div>
        <label className="mt-3 flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary accent-primary focus:ring-primary"
          />
          <span className="text-sm text-foreground">
            개인정보 수집 및 이용에 동의합니다.
          </span>
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
      >
        {loading ? "처리 중..." : "문의 보내기"}
      </button>
    </form>
  );
}
