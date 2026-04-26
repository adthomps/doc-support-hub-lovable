import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Mail, MessageCircle, Activity, CheckCircle2, Search, Ticket as TicketIcon } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { EmptyState } from "@/components/apt/EmptyState"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { findTickets, statusLabel, statusVariant, type Ticket } from "@/content/tickets"

const validCategories = ["billing", "technical", "account", "partner", "other"] as const

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  category: z.string().min(1, "Choose a category"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Please add at least 10 characters"),
})

type FormValues = z.infer<typeof schema>

export default function Support() {
  const [params] = useSearchParams()
  const presetCategory = params.get("category") ?? ""
  const initialCategory = (validCategories as readonly string[]).includes(presetCategory) ? presetCategory : ""
  const [submitted, setSubmitted] = useState<{ email: string } | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", category: initialCategory, subject: "", message: "" },
  })

  useEffect(() => {
    if (initialCategory) form.setValue("category", initialCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory])

  useEffect(() => {
    if (!submitted) return
    const t = setTimeout(() => setSubmitted(null), 8000)
    return () => clearTimeout(t)
  }, [submitted])

  const onSubmit = (values: FormValues) => {
    toast.success("Support request submitted", {
      description: `We'll reply to ${values.email} shortly.`,
    })
    setSubmitted({ email: values.email })
    form.reset({ name: "", email: "", category: initialCategory, subject: "", message: "" })
  }

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Support"
      title="Contact support"
      description="Reach our support team. We respond to most requests within one business day."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {submitted && (
            <AptCard variant="elevated" padding="default">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Request received</p>
                  <p className="text-xs text-muted-foreground mt-1">We sent a confirmation to {submitted.email}. A team member will follow up within one business day.</p>
                </div>
              </div>
            </AptCard>
          )}

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle>Submit a request</AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Choose a category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="technical">Technical / API</SelectItem>
                          <SelectItem value="account">Account & access</SelectItem>
                          <SelectItem value="partner">Partner / reseller</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl><Input placeholder="Short summary of the issue" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl><Textarea rows={6} placeholder="Describe what you were doing, what you expected, and what happened." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost" onClick={() => form.reset()}>Reset</Button>
                    <Button type="submit" variant="accent">Send request</Button>
                  </div>
                </form>
              </Form>
            </AptCardContent>
          </AptCard>
        </div>

        <aside className="space-y-6">
          <AptCard variant="feature">
            <AptCardHeader>
              <AptCardTitle className="text-base">Response times</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Standard</span>
                <AptTag>1 business day</AptTag>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Priority</span>
                <AptTag variant="accent">4 hours</AptTag>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Critical</span>
                <AptTag variant="warning">1 hour</AptTag>
              </div>
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle">
            <AptCardHeader>
              <AptCardTitle className="text-base">Other channels</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="mailto:support@example.com"><Mail className="h-4 w-4 mr-2" />support@example.com</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Community forum — coming soon")}>
                <MessageCircle className="h-4 w-4 mr-2" />Community forum
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/status"><Activity className="h-4 w-4 mr-2" />System status</Link>
              </Button>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
