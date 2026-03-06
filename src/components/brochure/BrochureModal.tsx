"use client";

import { useState, useCallback } from "react";
import { X } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+82", label: "🇰🇷 +82" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+81", label: "🇯🇵 +81" },
  { code: "+86", label: "🇨🇳 +86" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+84", label: "🇻🇳 +84" },
  { code: "+66", label: "🇹🇭 +66" },
  { code: "+62", label: "🇮🇩 +62" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+7", label: "🇷🇺 +7" },
];

const PRIVACY_POLICY_TEXT = `회사명(이하 '회사'라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.

제1조 (개인정보의 처리목적)
회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

1. 회사소개서 제공
2. 서비스 안내 및 상담
3. 마케팅 및 광고에의 활용`;

interface BrochureModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BrochureModal({ open, onClose }: BrochureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+82");
  const [phone, setPhone] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setCountryCode("+82");
    setPhone("");
    setPrivacyConsent(false);
    setError("");
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (!name.trim() || !email.trim() || !phone.trim()) {
        setError("필수 항목을 모두 입력해 주세요.");
        return;
      }

      if (!privacyConsent) {
        setError("개인정보 수집 및 이용에 동의해 주세요.");
        return;
      }

      setLoading(true);

      try {
        const res = await fetch("/api/brochure", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            countryCode,
            phone: phone.trim(),
            privacyConsent,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "요청 처리 중 오류가 발생했습니다.");
          return;
        }

        // Trigger PDF download
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        handleClose();
      } catch {
        setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    },
    [name, email, countryCode, phone, privacyConsent, handleClose],
  );

  if (!open) return null;

  const inputClass =
    "block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
          aria-label="닫기"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="max-h-[90vh] overflow-y-auto p-6 pt-8">
          <h2 className="text-xl font-bold text-foreground">소개서 다운로드</h2>
          <p className="mt-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <span className="text-muted">ⓘ</span>
              아래 정보를 기입 후 제출해 주시면, 다운로드 링크로 이동합니다.
            </span>
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* 업체명/담당자명 */}
            <div>
              <label
                htmlFor="brochure-name"
                className="block text-sm font-medium text-foreground"
              >
                업체명/담당자명{" "}
                <span className="text-red-500">●</span>
              </label>
              <input
                type="text"
                id="brochure-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동 / (주)회사이름"
                className={`mt-2 ${inputClass}`}
                required
              />
            </div>

            {/* 이메일 주소 */}
            <div>
              <label
                htmlFor="brochure-email"
                className="block text-sm font-medium text-foreground"
              >
                이메일 주소
              </label>
              <input
                type="email"
                id="brochure-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`mt-2 ${inputClass}`}
                required
              />
            </div>

            {/* 연락처 */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                연락처 <span className="text-red-500">●</span>
              </label>
              <div className="mt-2 flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-[120px] shrink-0 rounded-xl border border-border bg-white px-3 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="전화번호"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* 개인정보 수집 동의 */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                개인정보 수집 및 이용 동의{" "}
                <span className="text-red-500">●</span>
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

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "처리 중..." : "소개서 받기"}
            </button>
          </form>

          {/* Footer info */}
          <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted">
            <p>
              <span className="font-medium">영업시간</span> | 월-금 (공휴일
              제외) 10:00 - 19:00
            </p>
            <p className="mt-1">
              <span className="font-medium">전화번호</span> | 070-8820-3116
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
