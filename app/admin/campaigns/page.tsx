"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit } from "lucide-react"

const mockCampaigns = [
  {
    id: "1",
    name: "Spring Collection Launch",
    subject: "New Spring Collection - 20% Off",
    status: "sent",
    sentDate: "2025-01-10",
    recipients: 1248,
    openRate: 42.5,
    clickRate: 12.3,
  },
  {
    id: "2",
    name: "Bridal Season Promotion",
    subject: "Say Yes to the Dress - Special Offer",
    status: "scheduled",
    scheduledDate: "2025-01-20",
    recipients: 856,
    openRate: null,
    clickRate: null,
  },
]

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Email Campaigns</h1>
          <p className="text-muted-foreground">Create and manage email marketing campaigns</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-serif font-semibold mb-2">1,248</p>
              <p className="text-sm text-muted-foreground">Total Subscribers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-serif font-semibold mb-2">42.5%</p>
              <p className="text-sm text-muted-foreground">Avg. Open Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-serif font-semibold mb-2">12.3%</p>
              <p className="text-sm text-muted-foreground">Avg. Click Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{campaign.name}</h3>
                    <Badge variant={campaign.status === "sent" ? "default" : "secondary"}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{campaign.subject}</p>
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Recipients: </span>
                      <span className="font-medium">{campaign.recipients.toLocaleString()}</span>
                    </div>
                    {campaign.openRate !== null && (
                      <>
                        <div>
                          <span className="text-muted-foreground">Open Rate: </span>
                          <span className="font-medium">{campaign.openRate}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Click Rate: </span>
                          <span className="font-medium">{campaign.clickRate}%</span>
                        </div>
                      </>
                    )}
                    <div>
                      <span className="text-muted-foreground">
                        {campaign.status === "sent" ? "Sent: " : "Scheduled: "}
                      </span>
                      <span className="font-medium">
                        {new Date(campaign.sentDate || campaign.scheduledDate!).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  {campaign.status === "scheduled" && (
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
