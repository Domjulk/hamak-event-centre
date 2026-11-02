import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Accessibility,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  Flower2,
  MapPin,
  Menu,
  ParkingCircle,
  Phone,
  Sparkles,
  Star,
  UsersRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  buildInspectionMessage,
  inspectionRequestSchema,
} from "@/lib/inspection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hamak Event Centre | A garden venue in Kwaba, Abuja" },
      {
        name: "description",
        content:
          "Discover a spacious, secluded event venue with ample parking in Kwaba, Abuja. Book a Hamak Event Centre inspection on WhatsApp.",
      },
      { property: "og:title", content: "Hamak Event Centre | Kwaba, Abuja" },
      {
        property: "og:description",
        content: "A spacious, secluded event venue in Kwaba, Abuja.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const phone = "+234 806 866 0602";
const phoneLink = "tel:+2348068660602";
const whatsappLink = "https://wa.me/2348068660602";
const address = "Christopher Gwabin Musa Way, Kwaba, Abuja 900108, FCT";
const mapLink = "https://maps.google.com/?q=Hamak+Event+Centre+Kwaba+Abuja";

const highlights = [
  {
    icon: Flower2,
    number: "01",
    title: "Expansive event hall",
    description: "An adaptable gathering place for banquets, weddings and conferences.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "A quieter kind of setting",
    description: "Secluded grounds offer a private, distraction-free place to gather.",
  },
  {
    icon: ParkingCircle,
    number: "03",
    title: "Parking for your guests",
    description: "A dedicated on-site parking lot for a smoother arrival.",
  },
  {
    icon: Accessibility,
    number: "04",
    title: "Considered access",
    description: "Step-free entry and accommodating staff welcome every guest.",
  },
];

const inspiration = [
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=82",
    alt: "A warmly lit dining table arranged for an intimate event",
    className: "inspiration-image inspiration-image-large",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-888cb2e9e6da?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding table setting and floral details",
    className: "inspiration-image inspiration-image-small",
  },
];

const reviewers = ["Abdullahi Kauna", "Umar Usman", "Bishop Orubi"];

function Index() {
  const [inspectionOpen, setInspectionOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openInspection = () => setInspectionOpen(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = inspectionRequestSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      eventType: formData.get("eventType"),
      guests: formData.get("guests"),
      preferredDate: formData.get("preferredDate"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details and try again.");
      return;
    }
    if (parsed.data.preferredDate < getLocalDateString()) {
      toast.error("Choose a date that is today or later.");
      return;
    }

    const url = `${whatsappLink}?text=${encodeURIComponent(buildInspectionMessage(parsed.data))}`;
    toast.success("Your request is ready in WhatsApp.");
    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
    setInspectionOpen(false);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied.");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy the address. Please select and copy it instead.");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden pb-20 sm:pb-0">
      <header className="site-header">
        <div className="site-nav">
          <a className="brand-mark" href="#top" aria-label="Hamak Event Centre home">
            <span className="brand-symbol">H</span>
            <span className="brand-word">HAMAK<span>EVENT CENTRE</span></span>
          </a>

          <nav className={`desktop-links ${menuOpen ? "mobile-menu-open" : ""}`} aria-label="Main navigation">
            <a href="#specs" onClick={() => setMenuOpen(false)}>The space</a>
            <a href="#amenities" onClick={() => setMenuOpen(false)}>Amenities</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
            <a href="#location" onClick={() => setMenuOpen(false)}>Location</a>
            <a className="mobile-menu-call" href={phoneLink}><Phone size={15} /> Call the venue</a>
          </nav>

          <div className="nav-actions">
            <a className="nav-phone" href={phoneLink}><Phone size={15} /> {phone}</a>
            <Button className="nav-cta" onClick={openInspection}>Book an inspection <ArrowUpRight size={15} /></Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-rule" /> A private garden setting · Kwaba, Abuja</div>
          <h1>Room to gather.<br /><em>Space to celebrate.</em></h1>
          <p className="hero-text">A spacious, secluded and accessible event venue, thoughtfully set apart in Kwaba.</p>

          <div className="hero-rating">
            <span className="stars" aria-label="4.2 out of 5 stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span>
            <strong>4.2</strong><span className="rating-divider" />
            <a href="#reviews">37+ Google reviews <ChevronRight size={14} /></a>
          </div>

          <div className="hero-pills">
            <span><CarFront /> Ample parking</span>
            <span><Flower2 /> Secluded grounds</span>
            <span><Accessibility /> Wheelchair access</span>
          </div>

          <div className="hero-actions">
            <Button className="button-dark" onClick={openInspection}>Arrange an inspection <ArrowRight size={17} /></Button>
            <Button asChild variant="outline" className="button-outline"><a href="#specs">Explore the venue <ArrowDown size={15} /></a></Button>
          </div>
          <div className="hero-footnote"><MapPin size={15} /> Christopher Gwabin Musa Way, Kwaba</div>
        </div>

        <div className="hero-visual" aria-label="Event venue inspiration gallery">
          <div className="photo-frame photo-main"><img src={inspiration[0].src} alt={inspiration[0].alt} fetchPriority="high" /></div>
          <div className="photo-frame photo-inset"><img src={inspiration[1].src} alt={inspiration[1].alt} /></div>
          <div className="photo-note"><span className="photo-note-icon"><Flower2 size={19} /></span><span><strong>A setting for your story</strong><small>Event inspiration · venue photos welcome</small></span></div>
          <span className="image-caption">GATHER HERE <span>—</span> CELEBRATE WELL</span>
        </div>
      </section>

      <div className="quick-facts" aria-label="Venue quick facts">
        <div className="quick-fact"><span className="fact-icon"><MapPin /></span><span><small>IN THE HEART OF</small><strong>Kwaba, Abuja</strong></span></div>
        <span className="fact-divider" />
        <div className="quick-fact"><span className="fact-icon"><UsersRound /></span><span><small>MADE FOR</small><strong>Gatherings big & small</strong></span></div>
        <span className="fact-divider" />
        <a className="quick-fact quick-hours" href="#hours"><span className="fact-icon"><Clock3 /></span><span><small>OPEN MON–SAT</small><strong>9:30 AM – 5:00 PM</strong></span><ArrowUpRight size={15} /></a>
      </div>

      <section id="specs" className="space-section section-wrap">
        <div className="section-heading">
          <div><p className="eyebrow section-eyebrow">A little more room for what matters</p><h2>Space to make<br /><em>it your own.</em></h2></div>
          <p className="section-intro">From a joyful wedding to a focused conference, find the space, privacy and practical details that make a gathering feel right.</p>
        </div>
        <div id="amenities" className="amenities-grid">
          {highlights.map(({ icon: Icon, number, title, description }) => (
            <article className="amenity-item" key={number}>
              <div className="amenity-top"><span className="amenity-icon"><Icon size={21} /></span><span className="amenity-number">{number}</span></div>
              <h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className="reviews-section">
        <div className="section-wrap reviews-inner">
          <div className="reviews-overview">
            <p className="eyebrow light-eyebrow"><span className="eyebrow-rule" /> Kind words, shared</p>
            <div className="review-score"><span>4.2</span><div><span className="stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span><small>37+ Google reviews</small></div></div>
            <a href="https://www.google.com/maps/search/?api=1&query=Hamak+Event+Centre+Kwaba+Abuja" target="_blank" rel="noreferrer">See reviews on Google <ArrowUpRight size={15} /></a>
          </div>
          <div className="reviewer-list" aria-label="Recent guest reviewers">
            {reviewers.map((name, i) => (
              <article className="reviewer-row" key={name}><span className="reviewer-mark">{name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><div><strong>{name}</strong><span>Google reviewer</span></div><span className="reviewer-stars" aria-label="Google review">★★★★★</span></article>
            ))}
          </div>
        </div>
      </section>

      <section id="hours" className="hours-section section-wrap">
        <div className="hours-heading"><p className="eyebrow section-eyebrow">Come see for yourself</p><h2>Let’s find your<br /><em>perfect setting.</em></h2><p>Come by during office hours and discover the space in person.</p><Button className="button-dark" onClick={openInspection}>Plan your visit <ArrowRight size={17} /></Button></div>
        <div className="hours-table"><div className="hours-title"><span className="hours-clock"><Clock3 size={19} /></span><div><small>PLAN YOUR VISIT</small><h3>Office hours</h3></div></div><div className="hours-row"><span>Monday – Saturday</span><strong>9:30 AM – 5:00 PM</strong></div><div className="hours-row"><span>Sunday</span><strong className="closed-status">Closed</strong></div><a className="hours-contact" href={phoneLink}>Questions before you visit? <strong>Give us a call <ArrowRight size={14} /></strong></a></div>
      </section>

      <section id="location" className="location-section">
        <div className="section-wrap location-inner"><div className="location-copy"><p className="eyebrow section-eyebrow">Easy to find, worth the visit</p><h2>A little tucked away.<br /><em>A lot to celebrate.</em></h2><div className="address-line"><span className="location-pin"><MapPin size={19} /></span><p><strong>Hamak Event Centre</strong><span>{address}</span><small>Plus Code: 2CHQ+3MR</small></p></div><div className="location-actions"><Button asChild className="button-dark"><a href={mapLink} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a></Button><Button className="copy-button" variant="outline" onClick={copyAddress}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Copied" : "Copy address"}</Button></div></div>
          <a className="map-illustration" href={mapLink} target="_blank" rel="noreferrer" aria-label="Open directions to Hamak Event Centre in Google Maps"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-green patch-one" /><span className="map-green patch-two" /><span className="map-route" /><span className="map-pin"><MapPin size={21} fill="currentColor" /></span><span className="map-label"><MapPin size={15} /> HAMAK EVENT CENTRE</span><span className="map-link">Open in Google Maps <ArrowUpRight size={13} /></span><span className="map-plus">2CHQ+3MR</span></a>
        </div>
      </section>

      <footer className="site-footer"><div className="footer-inner"><a className="brand-mark footer-brand" href="#top"><span className="brand-symbol">H</span><span className="brand-word">HAMAK<span>EVENT CENTRE</span></span></a><span className="footer-note">A quieter place to come together.</span><div className="footer-links"><a href={phoneLink}><Phone size={14} /> {phone}</a><a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a></div><span className="footer-copyright">KWABA · ABUJA</span></div></footer>

      <div className="mobile-contact-bar"><a href={phoneLink}><Phone size={17} /> Call</a><Button onClick={openInspection}>Book an inspection <ArrowRight size={17} /></Button><a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Message Hamak on WhatsApp"><span>WA</span></a></div>

      <Dialog open={inspectionOpen} onOpenChange={setInspectionOpen}>
        <DialogContent className="inspection-dialog">
          <DialogHeader className="inspection-header"><span className="inspection-icon"><Flower2 size={21} /></span><span className="eyebrow section-eyebrow">A visit is the best way to know</span><DialogTitle className="font-display">Come see Hamak.</DialogTitle><DialogDescription>Tell us a little about your plans and we’ll help arrange your visit.</DialogDescription></DialogHeader>
          <form className="inspection-form" onSubmit={handleSubmit} noValidate>
            <label>Full name<Input name="fullName" placeholder="Your name" autoComplete="name" maxLength={100} required /></label>
            <label>Phone number<Input name="phone" type="tel" placeholder="e.g. 080 1234 5678" autoComplete="tel" maxLength={24} required /></label>
            <label>What are you planning?
              <select name="eventType" defaultValue="" required><option value="" disabled>Select event type</option><option>Wedding</option><option>Birthday celebration</option><option>Conference or meeting</option><option>Family gathering</option><option>Other event</option></select>
            </label>
            <div className="form-row"><label>Estimated guests<Input name="guests" type="number" inputMode="numeric" placeholder="e.g. 100" min="1" max="10000" required /></label><label>Preferred date<Input name="preferredDate" type="date" min={getLocalDateString()} required /></label></div>
            <p className="form-assurance"><Check size={14} /> Your request opens as a message to Hamak on WhatsApp.</p>
            <Button className="button-dark form-submit" type="submit">Continue to WhatsApp <ArrowUpRight size={17} /></Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function getLocalDateString() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}
