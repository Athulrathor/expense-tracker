import react from 'react';
import { CreditCard, BarChart3, ShieldCheck, Mail, Phone, MapPin, Check } from "lucide-react";

const MainContent = ({ setLogin }) => {

    const features = [
        {
            icon: CreditCard,
            title: "Smart Expense Tracking",
            description:
                "Automatically categorize transactions and monitor your spending in real time.",
            color: "bg-primary-100 text-primary-600",
        },
        {
            icon: BarChart3,
            title: "Advanced Analytics",
            description:
                "Visualize cash flow, budgets, and trends with powerful, easy-to-read charts.",
            color: "bg-success-100 text-success-600",
        },
        {
            icon: ShieldCheck,
            title: "Bank-Level Security",
            description:
                "Your data is protected with encryption and best-in-class security standards.",
            color: "bg-warning-100 text-warning-600",
        },
    ];

    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for personal use",
            features: [
                "Basic expense tracking",
                "Monthly reports",
                "Email support",
            ],
            cta: "Get Started",
            highlighted: false,
        },
        {
            name: "Pro",
            price: "$12",
            description: "Best for growing finances",
            features: [
                "Unlimited tracking",
                "Advanced analytics",
                "Budget planning",
                "Priority support",
            ],
            cta: "Start Free Trial",
            highlighted: true,
        },
        {
            name: "Business",
            price: "$29",
            description: "For teams & businesses",
            features: [
                "Team access",
                "Custom reports",
                "API integrations",
                "Dedicated support",
            ],
            cta: "Contact Sales",
            highlighted: false,
        },
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:py-28">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT: Text Content */}
                        <div className="text-center lg:text-left">

                            {/* Badge */}
                            <span className="inline-flex items-center rounded-full bg-primary-50 px-4 py-1 text-body-sm font-semibold text-primary-600">
                                🚀 Smart Finance for Everyone
                            </span>

                            {/* Headline */}
                            <h1 className="mt-6 text-display-md sm:text-display-lg text-navy-900 font-bold tracking-tight">
                                Take Control of Your
                                <span className="block text-primary-600">
                                    Money Flow
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="mt-6 text-body-lg text-navy-500 max-w-xl mx-auto lg:mx-0">
                                FlowFunds helps you track expenses, plan budgets, and grow your savings —
                                all in one intuitive platform.
                            </p>

                            {/* CTA Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <button onClick={() => { setLogin(true) }} className="px-8 py-3 rounded-2xl bg-primary-600 text-white font-semibold shadow-lg hover:bg-primary-500 transition">
                                    Get Started Free
                                </button>
                                <button className="px-8 py-3 rounded-2xl text-primary-600 font-semibold hover:bg-primary-50 transition">
                                    View Demo
                                </button>
                            </div>

                            {/* Social Proof */}
                            <p className="mt-6 text-body-sm text-navy-400">
                                Trusted by 10,000+ users worldwide
                            </p>
                        </div>

                        {/* RIGHT: Visual / Mockup */}
                        <div className="relative">

                            <div className="relative rounded-3xl bg-navy-900 p-6 shadow-2xl">
                                <div className="rounded-2xl bg-white p-6">

                                    <div className="h-4 w-24 rounded bg-navy-200 mb-4" />
                                    <div className="h-3 w-full rounded bg-navy-100 mb-2" />
                                    <div className="h-3 w-5/6 rounded bg-navy-100 mb-6" />

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-20 rounded-xl bg-primary-100" />
                                        <div className="h-20 rounded-xl bg-success-100" />
                                        <div className="h-20 rounded-xl bg-warning-100" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary-100 blur-3xl opacity-60" />
                        </div>

                    </div>
                </div>
            </section>
            {/* Features Section */}
            <section id="features" className="bg-navy-50">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24">

                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="text-overline text-primary-600">
                            Features
                        </span>
                        <h2 className="mt-3 text-display-sm text-navy-900 font-bold">
                            Everything You Need to
                            <span className="text-primary-600"> Manage Money</span>
                        </h2>
                        <p className="mt-4 text-body-lg text-navy-500">
                            Powerful tools designed to give you clarity, control, and confidence
                            over your finances.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="
                group
                rounded-3xl
                bg-white
                p-8
                shadow-card
                hover:shadow-card-hover
                transition-all duration-300
              "
                            >
                                {/* Icon */}
                                <div
                                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                                >
                                    <feature.icon className="h-6 w-6" />
                                </div>

                                {/* Title */}
                                <h3 className="text-h4 text-navy-900 font-semibold">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-3 text-body text-navy-500">
                                    {feature.description}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
            {/* Price Section */}
            <section id="pricing" className="bg-navy-50">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24">

                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="text-overline text-primary-600">
                            Pricing
                        </span>
                        <h2 className="mt-3 text-display-sm text-navy-900 font-bold">
                            Simple, Transparent
                            <span className="text-primary-600"> Pricing</span>
                        </h2>
                        <p className="mt-4 text-body-lg text-navy-500">
                            Choose a plan that fits your needs. Upgrade or cancel anytime.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`
                relative
                rounded-3xl
                bg-white
                p-8
                shadow-card
                transition-all duration-300
                hover:shadow-card-hover
                ${plan.highlighted ? "ring-2 ring-primary-600 scale-[1.02]" : ""}
              `}
                            >

                                {/* Badge */}
                                {plan.highlighted && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-body-xs font-semibold text-white">
                                        Most Popular
                                    </span>
                                )}

                                {/* Title */}
                                <h3 className="text-h4 font-semibold text-navy-900">
                                    {plan.name}
                                </h3>

                                {/* Price */}
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-display-sm font-bold text-navy-900">
                                        {plan.price}
                                    </span>
                                    <span className="text-body text-navy-400">
                                        /month
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="mt-2 text-body text-navy-500">
                                    {plan.description}
                                </p>

                                {/* Features */}
                                <ul className="mt-6 space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-body text-navy-600">
                                            <Check className="h-5 w-5 text-success-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    className={`
                  mt-8 w-full rounded-2xl px-6 py-3 font-semibold transition
                  ${plan.highlighted
                                            ? "bg-primary-600 text-white hover:bg-primary-500"
                                            : "border border-primary-600 text-primary-600 hover:bg-primary-50"
                                        }
                `}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section id="contact" className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24">

                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="text-overline text-primary-600">
                            Contact
                        </span>
                        <h2 className="mt-3 text-display-sm text-navy-900 font-bold">
                            Get in
                            <span className="text-primary-600"> Touch</span>
                        </h2>
                        <p className="mt-4 text-body-lg text-navy-500">
                            Have questions or need help? Our team is here to support you.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* LEFT: Contact Info */}
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-h5 text-navy-900 font-semibold">
                                        Email
                                    </h4>
                                    <p className="text-body text-navy-500">
                                        support@flowfunds.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-100 text-success-600">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-h5 text-navy-900 font-semibold">
                                        Phone
                                    </h4>
                                    <p className="text-body text-navy-500">
                                        +1 (555) 123-4567
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning-100 text-warning-600">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-h5 text-navy-900 font-semibold">
                                        Office
                                    </h4>
                                    <p className="text-body text-navy-500">
                                        San Francisco, CA
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Contact Form */}
                        <form className="rounded-3xl bg-navy-50 p-8 shadow-card space-y-6">

                            <div>
                                <label className="block text-body-sm font-medium text-navy-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="mt-2 w-full rounded-xl border border-navy-200 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-body-sm font-medium text-navy-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="mt-2 w-full rounded-xl border border-navy-200 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-body-sm font-medium text-navy-700">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Tell us how we can help..."
                                    className="mt-2 w-full rounded-xl border border-navy-200 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="
                w-full
                rounded-2xl
                bg-primary-600
                px-6 py-3
                text-white
                font-semibold
                hover:bg-primary-500
                transition
              "
                            >
                                Send Message
                            </button>
                        </form>

                    </div>
                </div>
            </section>
        </main>
    )
};

export default MainContent;