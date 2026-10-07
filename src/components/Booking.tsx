import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  User,
  Phone,
  FileText,
  X,
  MessageCircle,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { siteConfig, buildWhatsAppUrl } from "../config";
import { getNext14Days, getTimeSlotsForDate } from "../utils/scheduleUtils";
import { useAppContext } from "../context/AppContext";

interface BookingFormProps {
  initialServiceSlug?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export const BookingFormCard: React.FC<BookingFormProps> = ({
  initialServiceSlug,
  isModal = false,
  onClose,
}) => {
  const { lang, preselectedServiceSlug } = useAppContext();

  // Compute next 14 days
  const next14Days = useMemo(() => getNext14Days(), []);
  const firstOpenDay = useMemo(
    () => next14Days.find((d) => !d.closed)?.isoDate || next14Days[0]?.isoDate || "",
    [next14Days]
  );

  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>(
    initialServiceSlug || preselectedServiceSlug || siteConfig.services[0]?.slug || "hydrafacial"
  );
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>("any");
  const [selectedDate, setSelectedDate] = useState<string>(firstOpenDay);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [submittedWaUrl, setSubmittedWaUrl] = useState<string | null>(null);

  const hiddenAnchorRef = useRef<HTMLAnchorElement | null>(null);

  // Sync if preselectedServiceSlug or initialServiceSlug changes
  useEffect(() => {
    if (initialServiceSlug) {
      setSelectedServiceSlug(initialServiceSlug);
    } else if (preselectedServiceSlug) {
      setSelectedServiceSlug(preselectedServiceSlug);
    }
  }, [initialServiceSlug, preselectedServiceSlug]);

  const currentService = useMemo(
    () =>
      siteConfig.services.find((s) => s.slug === selectedServiceSlug) ||
      siteConfig.services[0],
    [selectedServiceSlug]
  );

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !currentService) return [];
    return getTimeSlotsForDate(selectedDate, currentService.duration);
  }, [selectedDate, currentService]);

  // Ensure a valid default time slot is selected when date or service changes
  useEffect(() => {
    if (availableTimeSlots.length > 0 && !availableTimeSlots.includes(selectedTime)) {
      setSelectedTime(availableTimeSlots[0]);
    } else if (availableTimeSlots.length === 0) {
      setSelectedTime("");
    }
  }, [availableTimeSlots, selectedTime]);

  const selectedDateObj = useMemo(
    () => next14Days.find((d) => d.isoDate === selectedDate),
    [next14Days, selectedDate]
  );

  const selectedSpecialist = useMemo(
    () => siteConfig.team.find((t) => t.id === selectedSpecialistId),
    [selectedSpecialistId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!currentService) {
      setErrorMsg(lang === "ar" ? "يرجى اختيار الخدمة." : "Veuillez sélectionner un soin.");
      return;
    }
    if (!selectedDate || selectedDateObj?.closed) {
      setErrorMsg(
        lang === "ar"
          ? "يرجى اختيار تاريخ مفتوح."
          : "Veuillez choisir une date d'ouverture valide."
      );
      return;
    }
    if (!selectedTime) {
      setErrorMsg(
        lang === "ar" ? "يرجى اختيار الساعة المناسبة." : "Veuillez choisir un créneau horaire."
      );
      return;
    }
    const cleanName = fullName.trim();
    if (cleanName.length < 2) {
      setErrorMsg(
        lang === "ar" ? "يرجى إدخال اسمك الكامل." : "Veuillez renseigner votre nom complet."
      );
      return;
    }
    const cleanPhone = phone.replace(/\s+/g, "");
    if (cleanPhone.length < 8) {
      setErrorMsg(
        lang === "ar"
          ? "يرجى إدخال رقم هاتف صحيح."
          : "Veuillez saisir un numéro de téléphone valide (ex: 06...)."
      );
      return;
    }

    const specialistLabel = selectedSpecialist
      ? `${selectedSpecialist.name} (${selectedSpecialist.role})`
      : lang === "ar"
      ? "بدون تفضيل"
      : "Sans préférence";

    const dateReadable = selectedDateObj
      ? `${selectedDateObj.fullLabelFr} (${selectedDate})`
      : selectedDate;

    const messageLines = [
      `Bonjour *${siteConfig.businessName}* (${siteConfig.city}) ✨`,
      `Je souhaite confirmer une demande de rendez-vous :`,
      ``,
      `• *Soin* : ${currentService.name} (${currentService.duration} min — dès ${currentService.priceFrom} MAD)`,
      `• *Spécialiste* : ${specialistLabel}`,
      `• *Date souhaitée* : ${dateReadable}`,
      `• *Créneau horaire* : ${selectedTime}`,
      `• *Cliente* : ${cleanName}`,
      `• *Téléphone* : ${phone.trim()}`,
    ];

    if (notes.trim()) {
      messageLines.push(`• *Notes / Précisions* : ${notes.trim()}`);
    }

    messageLines.push(
      ``,
      `Merci de me confirmer la disponibilité de ce créneau.`
    );

    const waUrl = buildWhatsAppUrl(messageLines.join("\n"));
    setSubmittedWaUrl(waUrl);

    // Trigger anchor navigation cleanly without window.open
    setTimeout(() => {
      if (hiddenAnchorRef.current) {
        hiddenAnchorRef.current.click();
      }
    }, 50);
  };

  const handleReset = () => {
    setSubmittedWaUrl(null);
    setErrorMsg("");
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_-15px_rgba(31,58,51,0.08)] border border-[#1F3A33]/10 relative">
      {/* Hidden anchor for opening wa.me safely */}
      <a
        ref={hiddenAnchorRef}
        href={submittedWaUrl || buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      >
        WhatsApp
      </a>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-[#1F3A33]/10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-1.5">
            {lang === "ar" ? "حجز فوري ومؤكد" : "Réservation en ligne sans acompte"}
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#182622] tracking-tight">
            {lang === "ar" ? "احجزي موعدك الآن" : "Prendre rendez-vous"}
          </h2>
          <p className="text-sm text-[#5A6B65] mt-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>
              {lang === "ar"
                ? "تأكيد سريع عبر واتساب مع خبيراتنا"
                : "Confirmation rapide sur WhatsApp"}
            </span>
          </p>
        </div>

        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === "ar" ? "إغلاق" : "Fermer la fenêtre de réservation"}
            className="w-10 h-10 rounded-full bg-[#F4EFEA] text-[#1F3A33] hover:bg-[#1F3A33] hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {submittedWaUrl ? (
        <div className="py-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#1F3A33]/10 text-[#1F3A33] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9 text-[#1F3A33]" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-serif-luxury text-2xl font-semibold text-[#182622]">
              {lang === "ar"
                ? "طلبك جاهز، أكمليه عبر واتساب"
                : "Votre demande est prête, finalisez-la sur WhatsApp"}
            </h3>
            <p className="text-sm text-[#5A6B65] leading-relaxed">
              {lang === "ar"
                ? `لقد قمنا بتجهيز رسالتك مع كافة تفاصيل الموعد (${currentService?.name} يوم ${selectedDateObj?.fullLabelFr || selectedDate} على الساعة ${selectedTime}). اضغطي أدناه لإرسالها على واتساب.`
                : `Votre récapitulatif complet (${currentService?.name}, le ${selectedDateObj?.fullLabelFr || selectedDate} à ${selectedTime}) est pré-rempli. Cliquez ci-dessous si WhatsApp ne s'est pas ouvert automatiquement.`}
            </p>
          </div>

          <div className="bg-[#F4EFEA] rounded-xl p-4 text-left max-w-md mx-auto text-xs text-[#182622] space-y-1.5 border border-[#B8935A]/30">
            <div className="flex justify-between">
              <span className="text-[#5A6B65]">Soin choisi :</span>
              <span className="font-semibold">{currentService?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5A6B65]">Date & Heure :</span>
              <span className="font-semibold tabular-nums">
                {selectedDateObj?.fullLabelFr} · {selectedTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5A6B65]">Durée & Tarif :</span>
              <span className="font-semibold tabular-nums">
                {currentService?.duration} min · Dès {currentService?.priceFrom} MAD
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5A6B65]">Cliente :</span>
              <span className="font-semibold">
                {fullName} ({phone})
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={submittedWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#1F3A33] text-white text-sm font-medium hover:bg-[#162B25] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {lang === "ar" ? "فتح واتساب لإرسال الطلب" : "Ouvrir WhatsApp maintenant"}
              </span>
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3.5 rounded-lg border border-[#1F3A33]/20 text-sm font-medium text-[#182622] hover:bg-[#F4EFEA] transition-colors cursor-pointer whitespace-nowrap"
            >
              {lang === "ar" ? "تعديل المعلومات" : "Modifier ma demande"}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* 1. Service & Specialist (Underline style minimal selects) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor={isModal ? "modal-service" : "form-service"}
                className="block text-xs uppercase tracking-[0.14em] text-[#5A6B65] font-medium mb-2"
              >
                {lang === "ar" ? "اختاري العناية *" : "Soin souhaité *"}
              </label>
              <div className="relative">
                <select
                  id={isModal ? "modal-service" : "form-service"}
                  value={selectedServiceSlug}
                  onChange={(e) => setSelectedServiceSlug(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#1F3A33]/25 focus:border-[#1F3A33] focus:outline-none py-2.5 text-sm font-medium text-[#182622] transition-colors cursor-pointer"
                >
                  {siteConfig.services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {lang === "ar" ? s.nameAr : s.name} — Dès {s.priceFrom} MAD ({s.duration} min)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor={isModal ? "modal-specialist" : "form-specialist"}
                className="block text-xs uppercase tracking-[0.14em] text-[#5A6B65] font-medium mb-2"
              >
                {lang === "ar" ? "الأخصائية (اختياري)" : "Spécialiste (optionnel)"}
              </label>
              <div className="relative">
                <select
                  id={isModal ? "modal-specialist" : "form-specialist"}
                  value={selectedSpecialistId}
                  onChange={(e) => setSelectedSpecialistId(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#1F3A33]/25 focus:border-[#1F3A33] focus:outline-none py-2.5 text-sm font-medium text-[#182622] transition-colors cursor-pointer"
                >
                  <option value="any">
                    {lang === "ar" ? "أي أخصائية متاحة" : "Première praticienne disponible"}
                  </option>
                  {siteConfig.team.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} — {lang === "ar" ? member.roleAr : member.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. Date selector: next 14 days (closed days disabled) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs uppercase tracking-[0.14em] text-[#5A6B65] font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B8935A]" />
                <span>
                  {lang === "ar"
                    ? "اختاري اليوم (14 يوماً القادمة) *"
                    : "Date du rendez-vous (14 prochains jours) *"}
                </span>
              </label>
              <span className="text-xs text-[#5A6B65]">
                {lang === "ar" ? "الأحد مغلق" : "Dimanche fermé"}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1.5 -mx-1 px-1">
              {next14Days.map((day) => {
                const isSelected = day.isoDate === selectedDate;
                return (
                  <button
                    key={day.isoDate}
                    type="button"
                    disabled={day.closed}
                    onClick={() => setSelectedDate(day.isoDate)}
                    className={`shrink-0 min-w-[68px] py-2.5 px-3 rounded-xl border text-center transition-all ${
                      day.closed
                        ? "bg-neutral-100 border-neutral-200 text-neutral-400 opacity-50 cursor-not-allowed"
                        : isSelected
                        ? "bg-[#1F3A33] border-[#1F3A33] text-white shadow-sm cursor-pointer"
                        : "bg-[#F4EFEA]/60 border-[#1F3A33]/15 text-[#182622] hover:border-[#B8935A] cursor-pointer"
                    }`}
                  >
                    <span className="block text-[11px] uppercase tracking-wider opacity-80">
                      {lang === "ar" ? day.dayShortAr : day.dayShortFr}
                    </span>
                    <span className="block text-base font-semibold tabular-nums mt-0.5">
                      {day.dayNumber}
                    </span>
                    <span className="block text-[10px] opacity-75">
                      {day.closed ? (lang === "ar" ? "مغلق" : "Fermé") : day.monthShortFr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Time slots computed from opening hours + service duration */}
          <div>
            <label className="text-xs uppercase tracking-[0.14em] text-[#5A6B65] font-medium flex items-center gap-1.5 mb-2.5">
              <Clock className="w-3.5 h-3.5 text-[#B8935A]" />
              <span>
                {lang === "ar"
                  ? `الساعة المتاحة (${currentService?.duration} دقيقة) *`
                  : `Créneau horaire (${currentService?.duration} min) *`}
              </span>
            </label>

            {availableTimeSlots.length === 0 ? (
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg">
                {lang === "ar"
                  ? "الصالون مغلق في هذا اليوم. يرجى اختيار يوم آخر."
                  : "Le salon est fermé à cette date. Veuillez sélectionner un jour ouvré."}
              </p>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {availableTimeSlots.map((slot) => {
                  const active = slot === selectedTime;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-medium tabular-nums border transition-all cursor-pointer whitespace-nowrap ${
                        active
                          ? "bg-[#1F3A33] text-white border-[#1F3A33] shadow-xs"
                          : "bg-white text-[#182622] border-[#1F3A33]/15 hover:border-[#B8935A]"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Client Details (Underline style, minimal, no email field) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
            <div>
              <label
                htmlFor={isModal ? "modal-name" : "form-name"}
                className="block text-xs uppercase tracking-[0.14em] text-[#5A6B65] font-medium mb-1.5"
              >
                {lang === "ar" ? "الاسم الكامل *" : "Nom complet *"}
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-[#B8935A] absolute left-0 pointer-events-none" />
                <input
                  id={isModal ? "modal-name" : "form-name"}
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === "ar" ? "مثال: سلمى العلمي" : "Ex : Salma El Amrani"}
                  className="w-full bg-transparent border-0 border-b border-[#1F3A33]/25 focus:border-[#1F3A33] focus:outline-none py-2.5 pl-6 text-sm text-[#182622] placeholder:text-[#5A6B65]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={isModal ? "modal-phone" : "form-phone"}
                className="block text-xs uppercase tracking-[0.14em] text-[#5A6B65] font-medium mb-1.5"
              >
                {lang === "ar" ? "رقم الهاتف / واتساب *" : "Téléphone / WhatsApp *"}
              </label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-[#B8935A] absolute left-0 pointer-events-none" />
                <input
                  id={isModal ? "modal-phone" : "form-phone"}
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex : 06 61 23 45 67"
                  className="w-full bg-transparent border-0 border-b border-[#1F3A33]/25 focus:border-[#1F3A33] focus:outline-none py-2.5 pl-6 text-sm text-[#182622] tabular-nums placeholder:text-[#5A6B65]/50 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 5. Optional Notes (underline minimal) */}
          <div>
            <label
              htmlFor={isModal ? "modal-notes" : "form-notes"}
              className="block text-xs uppercase tracking-[0.14em] text-[#5A6B65] font-medium mb-1.5"
            >
              {lang === "ar"
                ? "ملاحظات إضافية (اختياري)"
                : "Notes ou demandes particulières (optionnel)"}
            </label>
            <div className="relative flex items-center">
              <FileText className="w-4 h-4 text-[#B8935A] absolute left-0 pointer-events-none" />
              <input
                id={isModal ? "modal-notes" : "form-notes"}
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  lang === "ar"
                    ? "مثال: بشرة حساسة، حجز لشخصين، أول زيارة (-10%)..."
                    : "Ex : Première visite (-10%), peau sensible, duo avec une amie..."
                }
                className="w-full bg-transparent border-0 border-b border-[#1F3A33]/25 focus:border-[#1F3A33] focus:outline-none py-2.5 pl-6 text-sm text-[#182622] placeholder:text-[#5A6B65]/50 transition-colors"
              />
            </div>
          </div>

          {/* Live Summary Box */}
          <div className="bg-[#F4EFEA] rounded-xl p-4 border border-[#B8935A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#B8935A] font-semibold">
                {lang === "ar" ? "ملخص الموعد المباشر" : "Récapitulatif en direct"}
              </div>
              <div className="text-sm font-semibold text-[#182622]">
                {lang === "ar" ? currentService?.nameAr : currentService?.name}
                <span className="mx-1.5 text-[#5A6B65]">·</span>
                <span className="font-normal text-[#5A6B65] tabular-nums">
                  {currentService?.duration} min
                </span>
              </div>
              <div className="text-xs text-[#5A6B65] tabular-nums">
                {selectedDateObj
                  ? lang === "ar"
                    ? selectedDateObj.fullLabelAr
                    : selectedDateObj.fullLabelFr
                  : selectedDate}
                {selectedTime ? ` à ${selectedTime}` : ""}
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#1F3A33]/10">
              <span className="text-xs text-[#5A6B65] block">
                {lang === "ar" ? "السعر ابتداءً من" : "Tarif indicatif"}
              </span>
              <span className="font-serif-luxury text-2xl font-bold text-[#1F3A33] tabular-nums">
                Dès {currentService?.priceFrom} MAD
              </span>
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-[#1F3A33] hover:bg-[#162B25] text-white font-medium text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#B8935A]" />
            <span>
              {lang === "ar" ? "تأكيد الحجز عبر واتساب" : "Confirmer sur WhatsApp"}
            </span>
          </button>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A6B65] pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B8935A]" />
              {lang === "ar"
                ? "بدون دفع مسبق · إلغاء مجاني"
                : "Aucun paiement en ligne · Paiement au salon"}
            </span>
            <span className="tabular-nums font-medium text-[#182622]">
              WhatsApp Direct : {siteConfig.phoneDisplay}
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

/**
 * Large Split Booking Section used on the Home page (after treatments & before footer)
 * and on Service/Area pages.
 */
export const BookingSection: React.FC<{
  sectionId?: string;
  initialServiceSlug?: string;
  badgeText?: string;
}> = ({ sectionId = "reservation", initialServiceSlug, badgeText }) => {
  const { lang } = useAppContext();

  return (
    <section
      id={sectionId}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left: Tall elegant photo with reassurance overlay */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[480px] flex flex-col justify-end p-6 sm:p-8 bg-[#1F3A33]">
          <img
            src={siteConfig.bookingImage}
            alt={`${siteConfig.businessName} — Réservation soin esthétique à ${siteConfig.city}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F3A33]/95 via-[#1F3A33]/45 to-transparent" />

          <div className="relative z-10 text-white space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              {badgeText ||
                (lang === "ar"
                  ? "لحظة استرخاء خاصة بك"
                  : "Votre parenthèse beauté à Agadir")}
            </p>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal leading-tight text-balance">
              {lang === "ar"
                ? "احجزي حصتك في أقل من دقيقة"
                : "Réservez votre créneau sur-mesure en 60 secondes"}
            </h3>
            <p className="text-sm text-white/85 leading-relaxed">
              {lang === "ar"
                ? "فضاء نسائي 100% في حي فونتي بأكادير. استشارة مجانية قبل كل عناية وتأكيد فوري عبر واتساب."
                : "Espace 100% féminin et intimiste à Founty, Agadir. Diagnostic personnalisé offert avant chaque protocole et confirmation immédiate par notre équipe."}
            </p>

            <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-white/90">
              <div>
                <span className="block text-[#B8935A] uppercase tracking-wider text-[11px]">
                  {lang === "ar" ? "العنوان" : "Adresse"}
                </span>
                <span>Founty, {siteConfig.city}</span>
              </div>
              <div>
                <span className="block text-[#B8935A] uppercase tracking-wider text-[11px]">
                  {lang === "ar" ? "خط الحجز المباشر" : "Ligne directe"}
                </span>
                <span className="tabular-nums font-semibold">{siteConfig.phoneDisplay}</span>
              </div>
              <div>
                <span className="block text-[#B8935A] uppercase tracking-wider text-[11px]">
                  {lang === "ar" ? "عرض الترحيب" : "Offre Bienvenue"}
                </span>
                <span>
                  {siteConfig.announcementBar.badgeDiscount}{" "}
                  {siteConfig.announcementBar.badgeLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Form Card */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <BookingFormCard initialServiceSlug={initialServiceSlug} />
        </div>
      </div>
    </section>
  );
};

/**
 * Accessible Booking Modal / Mobile Bottom Sheet
 */
export const BookingModal: React.FC = () => {
  const { isBookingModalOpen, closeBookingModal, preselectedServiceSlug } =
    useAppContext();
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isBookingModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeBookingModal();
      }
      // Simple focus trap inside modal
      if (e.key === "Tab" && modalContainerRef.current) {
        const focusable = modalContainerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isBookingModalOpen, closeBookingModal]);

  if (!isBookingModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Réserver un soin"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeBookingModal();
        }
      }}
    >
      <div
        ref={modalContainerRef}
        className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl transition-transform duration-200"
      >
        <BookingFormCard
          initialServiceSlug={preselectedServiceSlug}
          isModal={true}
          onClose={closeBookingModal}
        />
      </div>
    </div>
  );
};
