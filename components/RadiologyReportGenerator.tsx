"use client"

import React, { useState, useEffect, createContext, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, Bell, Clock, Sun, Moon, Save, Download, Printer, Users, Tag,
  CornerUpLeft, CornerUpRight, Maximize,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  List, Code, Link, Image as ImageIcon, Table, Paperclip,
  Brain, Lightbulb, FileText, Wand2, Mic, Send, 
  Plus, Trash2, PenTool, Sliders, Settings, HelpCircle, LogOut,
  Check, ChevronsUpDown, X, User, Loader2,
  LayoutTemplate, FileUp, BookOpen, Sparkles,
  Share2,
  
  Zap, Eye, EyeOff
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface AppContextType {
  isDarkMode: boolean
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  messages: { role: string; content: string }[]
  setMessages: React.Dispatch<React.SetStateAction<{ role: string; content: string }[]>>
  reportProgress: number
  setReportProgress: React.Dispatch<React.SetStateAction<number>>
  wordCount: number
  characterCount: number
  autoSave: boolean
  setAutoSave: React.Dispatch<React.SetStateAction<boolean>>
  autoTextoTriggers: { id: number; trigger: string; content: string; tags: string[]; category: string; conditions: string[] }[]
  setAutoTextoTriggers: React.Dispatch<React.SetStateAction<{ id: number; trigger: string; content: string; tags: string[]; category: string; conditions: string[] }[]>>
  templates: { id: number; name: string; content: string; description: string; modality: string; bodyPart: string; customFields: { name: string; value: string }[] }[]
  setTemplates: React.Dispatch<React.SetStateAction<{ id: number; name: string; content: string; description: string; modality: string; bodyPart: string; customFields: { name: string; value: string }[] }[]>>
  keywords: string[]
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>
  notifications: string[]
  setNotifications: React.Dispatch<React.SetStateAction<string[]>>
  collaborators: string[]
  setCollaborators: React.Dispatch<React.SetStateAction<string[]>>
  userProfile: { name: string; crm: string; crmState: string; subspecialty: string; email: string }
  setUserProfile: React.Dispatch<React.SetStateAction<{ name: string; crm: string; crmState: string; subspecialty: string; email: string }>>
  saveReport: () => void
  exportReport: () => void
  sendMessage: (message: string, role?: string) => void
  aiAssist: () => void
  generateImpressions: () => void
  generateReport: () => void
  enhanceReport: () => void
  openUserProfile: () => void
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  studyInfo: { accessionNumber: string; studyDate: string; modality: string; bodyPart: string }
  setStudyInfo: React.Dispatch<React.SetStateAction<{ accessionNumber: string; studyDate: string; modality: string; bodyPart: string }>>
  clinicalHistory: string
  setClinicalHistory: React.Dispatch<React.SetStateAction<string>>
  findings: string[]
  setFindings: React.Dispatch<React.SetStateAction<string[]>>
  impressions: string[]
  setImpressions: React.Dispatch<React.SetStateAction<string[]>>
  recommendations: string[]
  setRecommendations: React.Dispatch<React.SetStateAction<string[]>>
  criticalFindings: string[]
  setCriticalFindings: React.Dispatch<React.SetStateAction<string[]>>
  addFinding: (finding: string) => void
  removeFinding: (index: number) => void
  addImpression: (impression: string) => void
  removeImpression: (index: number) => void
  addRecommendation: (recommendation: string) => void
  removeRecommendation: (index: number) => void
  addCriticalFinding: (finding: string) => void
  removeCriticalFinding: (index: number) => void
  reportVersions: { id: number; content: string; timestamp: Date }[]
  setReportVersions: React.Dispatch<React.SetStateAction<{ id: number; content: string; timestamp: Date }[]>>
  currentReportVersion: number
  setCurrentReportVersion: React.Dispatch<React.SetStateAction<number>>
  createReportVersion: () => void
  switchReportVersion: (versionId: number) => void
  compareReportVersions: (versionId1: number, versionId2: number) => void
  recentReports: { id: number; patientName: string; modality: string; date: string }[]
  setRecentReports: React.Dispatch<React.SetStateAction<{ id: number; patientName: string; modality: string; date: string }[]>>
  loadRecentReport: (reportId: number) => void
  reportStatistics: { totalReports: number; averageWordsPerReport: number; mostCommonModality: string }
  setReportStatistics: React.Dispatch<React.SetStateAction<{ totalReports: number; averageWordsPerReport: number; mostCommonModality: string }>>
  updateReportStatistics: () => void
  macros: { id: number; name: string; content: string; category: string }[]
  setMacros: React.Dispatch<React.SetStateAction<{ id: number; name: string; content: string; category: string }[]>>
  addMacro: (name: string, content: string, category: string) => void
  removeMacro: (id: number) => void
  applyMacro: (id: number) => void
  referenceMaterials: { id: number; title: string; content: string; category: string }[]
  setReferenceMaterials: React.Dispatch<React.SetStateAction<{ id: number; title: string; content: string; category: string }[]>>
  addReferenceMaterial: (title: string, content: string, category: string) => void
  removeReferenceMaterial: (id: number) => void
  viewReferenceMaterial: (id: number) => void
  measurementTools: { id: number; name: string; value: number; unit: string }[]
  setMeasurementTools: React.Dispatch<React.SetStateAction<{ id: number; name: string; value: number; unit: string }[]>>
  addMeasurement: (name: string, value: number, unit: string) => void
  removeMeasurement: (id: number) => void
  updateMeasurement: (id: number, value: number) => void
  voiceCommands: { command: string; action: () => void }[]
  setVoiceCommands: React.Dispatch<React.SetStateAction<{ command: string; action: () => void }[]>>
  addVoiceCommand: (command: string, action: () => void) => void
  removeVoiceCommand: (command: string) => void
  executeVoiceCommand: (command: string) => void
  reportQualityScore: number
  setReportQualityScore: React.Dispatch<React.SetStateAction<number>>
  calculateReportQualityScore: () => void
  reportTemplateCategories: string[]
  setReportTemplateCategories: React.Dispatch<React.SetStateAction<string[]>>
  addReportTemplateCategory: (category: string) => void
  removeReportTemplateCategory: (category: string) => void
  customizationOptions: { fontSize: number; fontFamily: string; lineSpacing: number }
  setCustomizationOptions: React.Dispatch<React.SetStateAction<{ fontSize: number; fontFamily: string; lineSpacing: number }>>
  updateCustomizationOption: (option: string, value: number | string) => void
  reportComments: { id: number; user: string; content: string; timestamp: Date }[]
  setReportComments: React.Dispatch<React.SetStateAction<{ id: number; user: string; content: string; timestamp: Date }[]>>
  addReportComment: (user: string, content: string) => void
  removeReportComment: (id: number) => void
  aiSuggestions: { id: number; content: string; category: string }[]
  setAiSuggestions: React.Dispatch<React.SetStateAction<{ id: number; content: string; category: string }[]>>
  generateAiSuggestion: (category: string) => void
  applyAiSuggestion: (id: number) => void
  dismissAiSuggestion: (id: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const ThemeToggle = ({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={toggleDarkMode}
    className="w-10 h-10 rounded-full transition-colors duration-200"
    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
  >
    {isDarkMode ? (
      <Sun className="h-6 w-6 text-yellow-400 transition-transform duration-200 rotate-0 scale-100" />
    ) : (
      <Moon className="h-6 w-6 text-slate-900 transition-transform duration-200 rotate-90 scale-0" />
    )}
  </Button>
)

const Header = ({ toggleSidebar, isDarkMode, toggleDarkMode }: { toggleSidebar: () => void; isDarkMode: boolean; toggleDarkMode: () => void }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const appContext = React.useContext(AppContext)
  if (!appContext) {
    return null
  }
  const { notifications, setNotifications, openUserProfile, recentReports, loadRecentReport } = appContext

  const reports = [
    { value: "chest-xray", label: "Chest X-Ray" },
    { value: "brain-mri", label: "Brain MRI" },
    { value: "abdominal-ct", label: "Abdominal CT" },
    { value: "mammogram", label: "Mammogram" },
    { value: "spine-mri", label: "Spine MRI" },
  ]

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-foreground p-4 flex justify-between items-center shadow-md"
    >
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Laudos.AI</h1>
        <span className="text-sm">Report Generator</span>
      </div>
      <div className="flex items-center space-x-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? reports.find((report) => report.value === value)?.label
                : "Select report..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search report..." />
              <CommandEmpty>No report found.</CommandEmpty>
              <CommandGroup>
                {reports.map((report) => (
                  <CommandItem
                    key={report.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${value === report.value ? "opacity-100" : "opacity-0"}`}
                    />
                    {report.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setNotifications([])} aria-label="Notifications">
                <Bell className="h-5 w-5" />
                {notifications && notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{notifications.length}</span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="w-64 p-2">
                <h3 className="font-semibold mb-2">Notifications</h3>
                {!notifications || notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No new notifications</p>
                ) : (
                  <ul className="space-y-2">
                    {notifications.map((notification, index) => (
                      <li key={index} className="text-sm">{notification}</li>
                    ))}
                  </ul>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Recent activities">
                <Clock className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="w-64 p-2">
                <h3 className="font-semibold mb-2">Recent Reports</h3>
                <ul className="space-y-2 text-sm">
                  {recentReports.slice(0, 5).map((report) => (
                    <li key={report.id} className="flex justify-between items-center">
                      <span>{report.patientName} - {report.modality}</span>
                      <Button variant="ghost" size="sm" onClick={() => loadRecentReport(report.id)}>
                        Load
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Dr. John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">john.doe@hospital.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openUserProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}

const AutoTextoTrigger = ({ trigger, onEdit, onDelete }: { trigger: { id: number; trigger: string; content: string; tags: string[]; category: string; conditions: string[] }; onEdit: (trigger: { id: number; trigger: string; content: string; tags: string[]; category: string; conditions: string[] }) => void; onDelete: (trigger: { id: number; trigger: string; content: string; tags: string[]; category: string; conditions: string[] }) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="mb-2">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>{trigger.trigger}</span>
          <div>
            <Button variant="ghost" size="icon" onClick={() => onEdit(trigger)} aria-label="Edit trigger">
              <PenTool className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(trigger)} aria-label="Delete trigger">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xs mb-2 text-muted-foreground">{trigger.content}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {trigger.tags && trigger.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
        {trigger.conditions && trigger.conditions.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-semibold mb-1">Conditions:</p>
            <ul className="text-xs list-disc list-inside">
              {trigger.conditions.map((condition, index) => (
                <li key={index} className="text-muted-foreground">{condition}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
)

const AutoTexto = () => {
  const appContext = React.useContext(AppContext)
  if (!appContext) {
    return null
  }
  const { autoTextoTriggers, setAutoTextoTriggers, content } = appContext
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isAddingTrigger, setIsAddingTrigger] = useState(false)
  const [newTrigger, setNewTrigger] = useState({ trigger: '', content: '', tags: [], category: '', conditions: [] })
  const [isImporting, setIsImporting] = useState(false)
  const [importData, setImportData] = useState('')
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const { toast } = useToast()

  const filteredTriggers = useMemo(() => {
    return autoTextoTriggers ? autoTextoTriggers.filter(trigger =>
      (selectedCategory === 'All' || trigger.category === selectedCategory) &&
      (trigger.trigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trigger.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trigger.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    ) : []
  }, [autoTextoTriggers, selectedCategory, searchTerm])

  const handleAddTrigger = useCallback(() => {
    if (newTrigger.trigger && newTrigger.content && newTrigger.category) {
      setAutoTextoTriggers(prev => [...(prev || []), { ...newTrigger, id: Date.now() }])
      setNewTrigger({ trigger: '', content: '', tags: [], category: '', conditions: [] })
      setIsAddingTrigger(false)
      toast({ title: "AutoTexto trigger added", description: "New trigger has been added successfully." })
    }
  }, [newTrigger, setAutoTextoTriggers, toast])

  const handleEditTrigger = useCallback((trigger: { id: number; trigger: string; content: string; tags: string[]; category: string; conditions: string[] }) => {
    setNewTrigger(trigger)
    setIsAddingTrigger(true)
  }, [])

  const handleDeleteTrigger = useCallback((triggerToDelete: { id: number; trigger: string; content: string; tags: string[]; category: string; conditions: string[] }) => {
    setAutoTextoTriggers(prev => (prev || []).filter(t => t.id !== triggerToDelete.id))
    toast({ title: "AutoTexto trigger deleted", description: "The trigger has been removed successfully." })
  }, [setAutoTextoTriggers, toast])

  const handleImport = useCallback(() => {
    try {
      const importedTriggers = JSON.parse(importData)
      if (Array.isArray(importedTriggers)) {
        setAutoTextoTriggers(prev => [...(prev || []), ...importedTriggers])
        toast({ title: "AutoTexto triggers imported successfully", description: "New triggers have been added to your collection." })
        setIsImporting(false)
        setImportData('')
      } else {
        throw new Error("Invalid import data")
      }
    } catch (error) {
      toast({ title: "Error importing triggers", description: "Please check the import data format", variant: "destructive" })
    }
  }, [importData, setAutoTextoTriggers, toast])

  const handleExport = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(autoTextoTriggers))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "autotexto_triggers.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
    toast({ title: "AutoTexto triggers exported successfully", description: "Your triggers have been saved to a file." })
  }, [autoTextoTriggers, toast])

  const handleGenerateAIAutoTexto = useCallback(async () => {
    setIsGeneratingAI(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const aiGeneratedTrigger = {
        id: Date.now(),
        trigger: '/ai',
        content: 'AI-generated content based on context',
        tags: ['AI', 'generated'],
        category: 'AI',
        conditions: ['Report contains "AI" keyword', 'User preference set to "AI-assisted"']
      }
      setAutoTextoTriggers(prev => [...(prev || []), aiGeneratedTrigger])
      toast({ title: "AI-generated AutoTexto added successfully", description: "A new AI-generated trigger has been created." })
    } catch (error) {
      toast({ title: "Error generating AI AutoTexto", description: "Please try again later", variant: "destructive" })
    } finally {
      setIsGeneratingAI(false)
    }
  }, [setAutoTextoTriggers, toast])

  const checkConditions = useCallback((trigger: { id: number; trigger: string; content: string; tags: string[]; category: string; conditions: string[] }) => {
    return trigger.conditions.every(condition => content.includes(condition))
  }, [content])

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search AutoTexto triggers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Chest">Chest</SelectItem>
            <SelectItem value="Neuro">Neuro</SelectItem>
            <SelectItem value="Musculoskeletal">Musculoskeletal</SelectItem>
            <SelectItem value="AI">AI</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[calc(100vh-380px)]">
        <AnimatePresence>
          {filteredTriggers.map((trigger) => (
            <AutoTextoTrigger
              key={trigger.id}
              trigger={trigger}
              onEdit={handleEditTrigger}
              onDelete={handleDeleteTrigger}
            />
          ))}
        </AnimatePresence>
      </ScrollArea>
      {isAddingTrigger ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="space-y-2"
        >
          <Input
            placeholder="Trigger"
            value={newTrigger.trigger}
            onChange={(e) => setNewTrigger({ ...newTrigger, trigger: e.target.value })}
          />
          <Textarea
            placeholder="Content"
            value={newTrigger.content}
            onChange={(e) => setNewTrigger({ ...newTrigger, content: e.target.value })}
          />
          <Input
            placeholder="Tags (comma-separated)"
            value={newTrigger.tags.join(', ')}
            onChange={(e) => setNewTrigger({ ...newTrigger, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          />
          <Select value={newTrigger.category} onValueChange={(value) => setNewTrigger({ ...newTrigger, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Chest">Chest</SelectItem>
              <SelectItem value="Neuro">Neuro</SelectItem>
              <SelectItem value="Musculoskeletal">Musculoskeletal</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Conditions (one per line)"
            value={newTrigger.conditions.join('\n')}
            onChange={(e) => setNewTrigger({ ...newTrigger, conditions: e.target.value.split('\n').filter(c => c.trim()) })}
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={handleAddTrigger}>Save</Button>
            <Button variant="outline" onClick={() => setIsAddingTrigger(false)}>Cancel</Button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-2">
          <Button className="w-full" onClick={() => setIsAddingTrigger(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Trigger
          </Button>
          <div className="flex space-x-2">
            <Button className="flex-1" variant="secondary" onClick={() => setIsImporting(true)}>
              <FileUp className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button className="flex-1" variant="secondary" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={handleGenerateAIAutoTexto}
            disabled={isGeneratingAI}
          >
            {isGeneratingAI ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generate AI AutoTexto
          </Button>
        </div>
      )}
      <Dialog open={isImporting} onOpenChange={setIsImporting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import AutoTexto Triggers</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Paste your JSON data here"
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            rows={10}
          />
          <DialogFooter>
            <Button onClick={handleImport}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const AITemplateSystem = ({ templates, setTemplates, content, setContent }: { templates: { id: number; name: string; content: string; description: string; modality: string; bodyPart: string; customFields: { name: string; value: string }[] }[]; setTemplates: React.Dispatch<React.SetStateAction<{ id: number; name: string; content: string; description: string; modality: string; bodyPart: string; customFields: { name: string; value: string }[] }[]>>; content: string; setContent: React.Dispatch<React.SetStateAction<string>> }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  const [selectedModality, setSelectedModality] = useState('')
  const [selectedBodyPart, setSelectedBodyPart] = useState('')
  const [customFields, setCustomFields] = useState([{ name: '', value: '' }])
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: number; name: string; content: string; description: string; modality: string; bodyPart: string; customFields: { name: string; value: string }[] } | null>(null)
  const [isEditingTemplate, setIsEditingTemplate] = useState(false)
  const { toast } = useToast()

  const generateAITemplate = useCallback(async () => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const newTemplate = {
        id: Date.now(),
        name: templateName,
        description: templateDescription,
        modality: selectedModality,
        bodyPart: selectedBodyPart,
        customFields: customFields.filter(field => field.name && field.value),
        content: `AI-generated template for ${templateName}:

Modality: ${selectedModality}
Body Part: ${selectedBodyPart}

${content}

Custom Fields:
${customFields.filter(field => field.name && field.value)
  .map(field => `${field.name}: ${field.value}`).join('\n')}

This is a placeholder for AI-generated content based on the description: ${templateDescription}`
      }
      setTemplates(prev => [...prev, newTemplate])
      setIsGenerating(false)
      resetForm()
      toast({ title: "AI template generated successfully", description: "Your new template is ready to use." })
    } catch (error) {
      toast({ title: "Error generating AI template", description: "Please try again later", variant: "destructive" })
      setIsGenerating(false)
    }
  }, [templateName, templateDescription, selectedModality, selectedBodyPart, customFields, content, setTemplates, toast])

  const resetForm = useCallback(() => {
    setTemplateName('')
    setTemplateDescription('')
    setSelectedModality('')
    setSelectedBodyPart('')
    setCustomFields([{ name: '', value: '' }])
    setSelectedTemplate(null)
    setIsEditingTemplate(false)
  }, [])

  const applyTemplate = useCallback((template: { id: number; name: string; content: string; description: string; modality: string; bodyPart: string; customFields: { name: string; value: string }[] }) => {
    let appliedContent = template.content
    template.customFields.forEach(field => {
      appliedContent = appliedContent.replace(`{${field.name}}`, field.value)
    })
    setContent(appliedContent)
    toast({ title: "Template applied successfully", description: "The selected template has been applied to your report." })
  }, [setContent, toast])

  const deleteTemplate = useCallback((templateId: number) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId))
    toast({ title: "Template deleted successfully", description: "The selected template has been removed." })
  }, [setTemplates, toast])

  const addCustomField = useCallback(() => {
    setCustomFields(prev => [...prev, { name: '', value: '' }])
  }, [])

  const updateCustomField = useCallback((index: number, key: string, value: string) => {
    setCustomFields(prev => prev.map((field, i) => 
      i === index ? { ...field, [key]: value } : field
    ))
  }, [])

  const removeCustomField = useCallback((index: number) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleEditTemplate = useCallback((template: { id: number; name: string; content: string; description: string; modality: string; bodyPart: string; customFields: { name: string; value: string }[] }) => {
    setSelectedTemplate(template)
    setTemplateName(template.name)
    setTemplateDescription(template.description)
    setSelectedModality(template.modality)
    setSelectedBodyPart(template.bodyPart)
    setCustomFields(template.customFields.length > 0 ? template.customFields : [{ name: '', value: '' }])
    setIsEditingTemplate(true)
  }, [])

  const handleUpdateTemplate = useCallback(() => {
    if (selectedTemplate) {
      const updatedTemplate = {
        ...selectedTemplate,
        name: templateName,
        description: templateDescription,
        modality: selectedModality,
        bodyPart: selectedBodyPart,
        customFields: customFields.filter(field => field.name && field.value),
      }
      setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? updatedTemplate : t))
      resetForm()
      toast({ title: "Template updated successfully", description: "Your changes have been saved." })
    }
  }, [selectedTemplate, templateName, templateDescription, selectedModality, selectedBodyPart, customFields, setTemplates, resetForm, toast])

  return (
    <div className="space-y-4 text-foreground">
      <h3 className="text-lg font-semibold">AI Template System</h3>
      <Input
        placeholder="Template Name"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        className="bg-background text-foreground"
      />
      <Textarea
        placeholder="Template Description"
        value={templateDescription}
        onChange={(e) => setTemplateDescription(e.target.value)}
        className="bg-background text-foreground"
      />
      <Select value={selectedModality} onValueChange={setSelectedModality}>
        <SelectTrigger className="bg-background text-foreground">
          <SelectValue placeholder="Select modality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="X-Ray">X-Ray</SelectItem>
          <SelectItem value="CT">CT</SelectItem>
          <SelectItem value="MRI">MRI</SelectItem>
          <SelectItem value="Ultrasound">Ultrasound</SelectItem>
        </SelectContent>
      </Select>
      <Select value={selectedBodyPart} onValueChange={setSelectedBodyPart}>
        <SelectTrigger className="bg-background text-foreground">
          <SelectValue placeholder="Select body part" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Chest">Chest</SelectItem>
          <SelectItem value="Brain">Brain</SelectItem>
          <SelectItem value="Abdomen">Abdomen</SelectItem>
          <SelectItem value="Musculoskeletal">Musculoskeletal</SelectItem>
        </SelectContent>
      </Select>
      <div className="space-y-2">
        <Label className="text-foreground">Custom Fields</Label>
        {customFields.map((field, index) => (
          <div key={index} className="flex space-x-2">
            <Input
              placeholder="Field Name"
              value={field.name}
              onChange={(e) => updateCustomField(index, 'name', e.target.value)}
              className="flex-1 bg-background text-foreground"
            />
            <Input
              placeholder="Field Value"
              value={field.value}
              onChange={(e) => updateCustomField(index, 'value', e.target.value)}
              className="flex-1 bg-background text-foreground"
            />
            <Button onClick={() => removeCustomField(index)} variant="destructive" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={addCustomField} variant="outline" className="w-full">
          Add Custom Field
        </Button>
      </div>
      <Button
        onClick={isEditingTemplate ? handleUpdateTemplate : generateAITemplate}
        disabled={isGenerating || !templateName || !templateDescription || !selectedModality || !selectedBodyPart}
        className="w-full"
      >
        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
        {isEditingTemplate ? 'Update Template' : 'Generate AI Template'}
      </Button>
      <ScrollArea className="h-64 rounded-md border p-4 bg-background">
        {templates.map((template) => (
          <Card key={template.id} className="mb-2 bg-card">
            <CardHeader className="p-3">
              <CardTitle className="text-sm font-medium flex justify-between items-center">
                <span>{template.name}</span>
                <div>
                  <Button variant="ghost" size="sm" onClick={() => applyTemplate(template)}>
                    Apply
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditTemplate(template)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteTemplate(template.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-xs text-muted-foreground">{template.description}</p>
              <div className="mt-2">
                <Badge className="mr-1">{template.modality}</Badge>
                <Badge className="mr-1" variant="secondary">{template.bodyPart}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}

const Editor = () => {
  const appContext = React.useContext(AppContext)
  if (!appContext) {
    return null
  }
  const { content, setContent, saveReport, exportReport, isDarkMode, autoTextoTriggers, templates, setTemplates, collaborators, setCollaborators, tags, setTags, studyInfo, setStudyInfo, clinicalHistory, setClinicalHistory, findings, setFindings, impressions, setImpressions, recommendations, setRecommendations, criticalFindings, setCriticalFindings, addFinding, removeFinding, addImpression, removeImpression, addRecommendation, removeRecommendation, addCriticalFinding, removeCriticalFinding, reportVersions, createReportVersion, switchReportVersion, compareReportVersions, macros, applyMacro, referenceMaterials, viewReferenceMaterial, measurementTools, addMeasurement, removeMeasurement, updateMeasurement, voiceCommands, executeVoiceCommand, reportQualityScore, calculateReportQualityScore, customizationOptions, updateCustomizationOption, reportComments, addReportComment, removeReportComment, aiSuggestions, generateAiSuggestion, applyAiSuggestion, dismissAiSuggestion } = appContext
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('write')
  const [showAutoTexto, setShowAutoTexto] = useState(false)
  const [autoTextoFilter, setAutoTextoFilter] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)
  const [isCollaborating, setIsCollaborating] = useState(false)
  const [collaboratorEmail, setCollaboratorEmail] = useState('')
  const [newTag, setNewTag] = useState('')
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [showMeasurementTools, setShowMeasurementTools] = useState(false)
  const [showReferenceMaterials, setShowReferenceMaterials] = useState(false)
  const [showMacros, setShowMacros] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [selectedVersions, setSelectedVersions] = useState<number[]>([])
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const { toast } = useToast()

  const handleContentChange = useCallback((value: string) => {
    setContent(value)
    
    const words = value.split(/\s+/)
    const lastWord = words[words.length - 1]
    const trigger = autoTextoTriggers.find(t => t.trigger === lastWord)
    if (trigger && trigger.conditions.every(condition => value.includes(condition))) {
      const newContentWithAutoTexto = value.slice(0, -lastWord.length) + trigger.content
      setContent(newContentWithAutoTexto)
    } else if (lastWord.startsWith('/')) {
      setShowAutoTexto(true)
      setAutoTextoFilter(lastWord.slice(1))
    } else if (showAutoTexto) {
      setShowAutoTexto(false)
    }

    calculateReportQualityScore()
  }, [autoTextoTriggers, setContent, showAutoTexto, calculateReportQualityScore])

  const toggleFullscreen = useCallback(() =>  {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  const insertAutoTexto =  useCallback((triggerContent: string) => {
    const newContent = content.replace(/\/\w+$/, triggerContent + ' ')
    setContent(newContent)
    setShowAutoTexto(false)
  }, [content, setContent])

  const filteredAutoTextoTriggers = useMemo(() => autoTextoTriggers ? autoTextoTriggers.filter(trigger => 
    trigger.trigger.toLowerCase().includes(autoTextoFilter.toLowerCase())
  ) : [],  [autoTextoTriggers, autoTextoFilter])

  const handleSaveTemplate = useCallback(() => {
    setShowTemplates(true)
  }, [])

  const handleLoadTemplate = useCallback((template: { id: number; name: string; content: string; description: string; modality: string; bodyPart: string; customFields: { name: string; value: string }[] }) => {
    setContent(template.content)
    setShowTemplates(false)
    toast({ title: "Template loaded successfully", description: "The selected template has been applied to your report." })
  }, [setContent, toast])

  const handleShare = useCallback(() => {
    setIsCollaborating(true)
  }, [])

  const addCollaborator = useCallback(() => {
    if (collaboratorEmail && !collaborators.includes(collaboratorEmail)) {
      setCollaborators(prevCollaborators => [...prevCollaborators, collaboratorEmail])
      setCollaboratorEmail('')
      toast({ title: "Collaborator added successfully", description: `${collaboratorEmail} has been added as a collaborator.` })
    }
  }, [collaboratorEmail, collaborators, setCollaborators, toast])

  const addTag = useCallback(() => {
    if (newTag && !tags.includes(newTag)) {
      setTags(prevTags => [...prevTags, newTag])
      setNewTag('')
      setIsAddingTag(false)
      toast({ title: "Tag added successfully", description: `"${newTag}" has been added to your report tags.` })
    }
  }, [newTag, tags, setTags, toast])

  const removeTag = useCallback((tagToRemove: string) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove))
    toast({ title: "Tag removed", description: `"${tagToRemove}" has been removed from your report tags.` })
  }, [setTags, toast])

  const shareReport = useCallback(() => {
    const previewContent = `
      <div style="width: 210mm; height: 297mm; padding: 20mm; font-family: Arial, sans-serif;">
        <header style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333;">Laudos.AI</h1>
        </header>
        <div style="white-space: pre-wrap;">${content}</div>
        <footer style="text-align: center; margin-top: 20px;">
          <p>Generated with Laudos.AI - Try it now at <a href="https://laudos.ai">https://laudos.ai</a></p>
        </footer>
      </div>
    `
    const blob = new Blob([previewContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    setShareLink(url)
    setShowShareModal(true)
  }, [content])

  const handleVoiceInput = useCallback(() => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
          setContent(prevContent => prevContent + ' ' + transcript)
        }
        recognition.start()
      } else {
        toast({ title: "Voice input not supported", description: "Your browser does not support voice recognition.", variant: "destructive" })
      }
    } else {
      const recognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (recognition) {
        recognition.stop()
      }
    }
  }, [isRecording, setContent, toast])

  const handleMeasurementTools = useCallback(() => {
    setShowMeasurementTools(true)
  }, [])

  const handleReferenceMaterials = useCallback(() => {
    setShowReferenceMaterials(true)
  }, [])

  const handleMacros = useCallback(() => {
    setShowMacros(true)
  }, [])

  const handleVersionHistory = useCallback(() => {
    setShowVersionHistory(true)
  }, [])

  const toggleAIAssistant = useCallback(() => {
    setShowAIAssistant(!showAIAssistant)
  }, [showAIAssistant])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={saveReport}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Users className="h-4 w-4 mr-2" />
            Add Collaborator
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsAddingTag(true)}>
            <Tag className="h-4 w-4 mr-2" />
            Add Tag
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveTemplate}>
            <LayoutTemplate className="h-4 w-4 mr-2" />
            Save as Template
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowTemplates(true)}>
            <FileUp className="h-4 w-4 mr-2" />
            Load Template
          </Button>
          <Button variant="outline" size="sm" className="px-4 py-2 text-base" onClick={shareReport}>
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" aria-label="Undo">
            <CornerUpLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Redo">
            <CornerUpRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} aria-label="Toggle fullscreen">
            <Maximize className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleAIAssistant} aria-label="Toggle AI Assistant">
            {showAIAssistant ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="structured">Structured Report</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="flex-grow flex flex-col relative">
          <div className="flex space-x-2 mb-4">
            <Button variant="ghost" size="sm" aria-label="Bold"><Bold className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" aria-label="Italic"><Italic className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" aria-label="Underline"><Underline className="h-4 w-4" /></Button>
            <Separator orientation="vertical" />
            <Button variant="ghost" size="sm" aria-label="Align left"><AlignLeft className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" aria-label="Align center"><AlignCenter className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" aria-label="Align right"><AlignRight className="h-4 w-4" /></Button>
            <Separator orientation="vertical" />
            <Button variant="ghost" size="sm">H1</Button>
            <Button variant="ghost" size="sm">H2</Button>
            <Button variant="ghost" size="sm">H3</Button>
            <Separator orientation="vertical" />
            <Button variant="ghost" size="sm" aria-label="Bullet list"><List className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" aria-label="Code block"><Code className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" aria-label="Insert link"><Link className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" aria-label="Insert image"><ImageIcon className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" aria-label="Insert table"><Table className="h-4 w-4" /></Button>
            <Separator orientation="vertical" />
            <Button variant="ghost" size="sm" aria-label="Attach file">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" aria-label="Measurement tools" onClick={handleMeasurementTools}>
              <Sliders className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" aria-label="Reference materials" onClick={handleReferenceMaterials}>
              <BookOpen className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" aria-label="Macros" onClick={handleMacros}>
              <Zap className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" aria-label="Version history" onClick={handleVersionHistory}>
              <Clock className="h-4 w-4" />
            </Button>
          </div>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            className="flex-grow"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image', 'video'],
                ['clean']
              ],
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike',
              'list', 'bullet',
              'link', 'image', 'video'
            ]}
            style={{
              fontSize: `${customizationOptions.fontSize}px`,
              fontFamily: customizationOptions.fontFamily,
              lineHeight: customizationOptions.lineSpacing
            }}
          />
          <AnimatePresence>
            {showAutoTexto && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 w-full bg-popover rounded-md shadow-lg p-2 z-50"
              >
                <ScrollArea className="h-40">
                  {filteredAutoTextoTriggers.map((trigger) => (
                    <Button
                      key={trigger.id}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => insertAutoTexto(trigger.content)}
                    >
                      <span className="font-bold mr-2">{trigger.trigger}</span>
                      <span className="text-sm text-muted-foreground">{trigger.content}</span>
                    </Button>
                  ))}
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="preview" className="flex-grow">
          <div className={`prose ${isDarkMode ? 'dark:prose-invert' : ''} max-w-none h-full overflow-auto p-4`} style={{ width: '210mm', minHeight: '297mm', padding: '20mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1 style={{ color: isDarkMode ? '#fff' : '#333' }}>Laudos.AI</h1>
            </header>
            <div style={{ whiteSpace: 'pre-wrap', color: isDarkMode ? '#fff' : '#000' }} dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </TabsContent>
        <TabsContent value="structured" className="flex-grow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Study Information</h3>
              <Input
                placeholder="Accession Number"
                value={studyInfo.accessionNumber}
                onChange={(e) => setStudyInfo({ ...studyInfo, accessionNumber: e.target.value })}
              />
              <Input
                placeholder="Study Date"
                value={studyInfo.studyDate}
                onChange={(e) => setStudyInfo({ ...studyInfo, studyDate: e.target.value })}
              />
              <Select
                value={studyInfo.modality}
                onValueChange={(value) => setStudyInfo({ ...studyInfo, modality: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select modality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="X-Ray">X-Ray</SelectItem>
                  <SelectItem value="CT">CT</SelectItem>
                  <SelectItem value="MRI">MRI</SelectItem>
                  <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Body Part"
                value={studyInfo.bodyPart}
                onChange={(e) => setStudyInfo({ ...studyInfo, bodyPart: e.target.value })}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Clinical History</h3>
              <Textarea
                placeholder="Enter clinical history"
                value={clinicalHistory}
                onChange={(e) => setClinicalHistory(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Findings</h3>
            {findings.map((finding, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input value={finding} onChange={(e) => {
                  const newFindings = [...findings]
                  newFindings[index] = e.target.value
                  setFindings(newFindings)
                }} />
                <Button variant="ghost" size="sm" onClick={() => removeFinding(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={() => addFinding('')}>Add Finding</Button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Impressions</h3>
            {impressions.map((impression, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input value={impression} onChange={(e) => {
                  const newImpressions = [...impressions]
                  newImpressions[index] = e.target.value
                  setImpressions(newImpressions)
                }} />
                <Button variant="ghost" size="sm" onClick={() => removeImpression(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={() => addImpression('')}>Add Impression</Button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input value={recommendation} onChange={(e) => {
                  const newRecommendations = [...recommendations]
                  newRecommendations[index] = e.target.value
                  setRecommendations(newRecommendations)
                }} />
                <Button variant="ghost" size="sm" onClick={() => removeRecommendation(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={() => addRecommendation('')}>Add Recommendation</Button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Critical Findings</h3>
            {criticalFindings.map((finding, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input value={finding} onChange={(e) => {
                  const newCriticalFindings = [...criticalFindings]
                  newCriticalFindings[index] = e.target.value
                  setCriticalFindings(newCriticalFindings)
                }} />
                <Button variant="ghost" size="sm" onClick={() => removeCriticalFinding(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={() => addCriticalFinding('')}>Add Critical Finding</Button>
          </div>
        </TabsContent>
      </Tabs>
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>Template Management</DialogTitle>
          </DialogHeader>
          <AITemplateSystem
            templates={templates}
            setTemplates={setTemplates}
            content={content}
            setContent={setContent}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={isCollaborating} onOpenChange={setIsCollaborating}>
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>Add Collaborator</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Collaborator's email"
            value={collaboratorEmail}
            onChange={(e) => setCollaboratorEmail(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={addCollaborator}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddingTag} onOpenChange={setIsAddingTag}>
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>Add Tag</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={addTag}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>Share Report</DialogTitle>
          </DialogHeader>
          <p>Your report has been generated. You can share this link:</p>
          <Input value={shareLink} readOnly />
          <DialogFooter>
            <Button onClick={() => {
              navigator.clipboard.writeText(shareLink)
              toast({ title: "Link copied to clipboard", description: "You can now share this link with others." })
            }}>
              Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Sheet open={showMeasurementTools} onOpenChange={setShowMeasurementTools}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Measurement Tools</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            {measurementTools.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between mb-2">
                <span>{tool.name}</span>
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={tool.value}
                    onChange={(e) => updateMeasurement(tool.id, parseFloat(e.target.value))}
                    className="w-20 mr-2"
                  />
                  <span>{tool.unit}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeMeasurement(tool.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button onClick={() => addMeasurement('New Measurement', 0, 'mm')} className="mt-4">
              Add Measurement
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet open={showReferenceMaterials} onOpenChange={setShowReferenceMaterials}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Laudos.AI Documents</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            {referenceMaterials.map((material) => (
              <Card key={material.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{material.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{material.content.substring(0, 100)}...</p>
                  <Button variant="link" onClick={() => viewReferenceMaterial(material.id)}>
                    View Full Content
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Sheet open={showMacros} onOpenChange={setShowMacros}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Macros</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            {macros.map((macro) => (
              <Card key={macro.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{macro.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{macro.content.substring(0, 100)}...</p>
                  <Button variant="outline" onClick={() => applyMacro(macro.id)}>
                    Apply Macro
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Sheet open={showVersionHistory} onOpenChange={setShowVersionHistory}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Version History</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            {reportVersions.map((version) => (
              <Card key={version.id} className="mb-4">
                <CardHeader>
                  <CardTitle>Version {version.id}</CardTitle>
                  <p>{new Date(version.timestamp).toLocaleString()}</p>
                </CardHeader>
                <CardContent>
                  <p>{version.content.substring(0, 100)}...</p>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" onClick={() => switchReportVersion(version.id)}>
                      Switch to This Version
                    </Button>
                    <Checkbox
                      checked={selectedVersions.includes(version.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedVersions([...selectedVersions, version.id])
                        } else {
                          setSelectedVersions(selectedVersions.filter(id => id !== version.id))
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            {selectedVersions.length === 2 && (
              <Button onClick={() => compareReportVersions(selectedVersions[0], selectedVersions[1])}>
                Compare Selected Versions
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
      {showAIAssistant && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-80 bg-background shadow-lg p-4 overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-4">AI Assistant</h2>
          <div className="space-y-4">
            <Button className="w-full" onClick={() => generateAiSuggestion('general')}>
              Generate Suggestion
            </Button>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion) => (
                <Card key={suggestion.id}>
                  <CardHeader>
                    <CardTitle className="text-sm">{suggestion.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{suggestion.content}</p>
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button size="sm" onClick={() => applyAiSuggestion(suggestion.id)}>Apply</Button>
                      <Button size="sm" variant="outline" onClick={() => dismissAiSuggestion(suggestion.id)}>Dismiss</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

const AIAssistant = () => {
  const appContext = React.useContext(AppContext)
  if (!appContext) {
    return null
  }
  const { messages, sendMessage, aiAssist, generateImpressions, generateReport, enhanceReport, setKeywords, setNotifications, aiSuggestions, generateAiSuggestion, applyAiSuggestion, dismissAiSuggestion } = appContext
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [confidenceLevel, setConfidenceLevel] = useState(0.5)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(scrollToBottom, [messages])

  const handleSend = useCallback(() => {
    if (input.trim() && !isProcessing) {
      setIsProcessing(true)
      sendMessage(input)
      setInput('')
      setTimeout(() => {
        setIsProcessing(false)
        const aiResponse = "I've analyzed the report and identified potential areas for improvement. Would you like me to suggest enhancements?"
        sendMessage(aiResponse, 'assistant')
        setKeywords(['lung', 'nodule', 'pneumonia'])
        setNotifications(prev => [...(prev || []), "AI Assistant has new suggestions for your report."])
        toast({ title: "AI Assistant", description: "New suggestions are available for your report." })
      }, 2000)
    }
  }, [input, isProcessing, sendMessage, setKeywords, setNotifications, toast])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full"
    >
      <div className="space-y-2 mb-4">
        <Button className="w-full justify-start" onClick={aiAssist}>
          <Brain className="h-5 w-5 mr-2" />
          AI Assist
        </Button>
        <Button className="w-full justify-start" onClick={generateImpressions}>
          <Lightbulb className="h-5 w-5 mr-2" />
          Generate Impressions
        </Button>
        <Button className="w-full justify-start" onClick={generateReport}>
          <FileText className="h-5 w-5 mr-2" />
          Generate Report
        </Button>
        <Button className="w-full justify-start" onClick={enhanceReport}>
          <Wand2 className="h-5 w-5 mr-2" />
          Enhance Report
        </Button>
        <div className="space-y-2">
          <Label htmlFor="confidence-level">AI Confidence Level</Label>
          <Slider
            id="confidence-level"
            min={0}
            max={1}
            step={0.1}
            value={[confidenceLevel]}
            onValueChange={(value) => setConfidenceLevel(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Aggressive</span>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-grow mb-4 rounded-md border p-4">
        <AnimatePresence>
          {messages && messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div className={`inline-block p-3 rounded-lg ${
                message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="space-y-2">
        <h3 className="font-semibold">AI Suggestions</h3>
        {aiSuggestions.map((suggestion) => (
          <Card key={suggestion.id} className="mb-2">
            <CardHeader>
              <CardTitle className="text-sm">{suggestion.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{suggestion.content}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => applyAiSuggestion(suggestion.id)}>
                  Apply
                </Button>
                <Button variant="ghost" size="sm" onClick={() => dismissAiSuggestion(suggestion.id)}>
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <Button className="w-full" onClick={() => generateAiSuggestion('general')}>
          Generate New Suggestion
        </Button>
      </div>
      <div className="flex space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI for assistance..."
          onKeyDown={handleKeyDown}
          className="flex-grow"
          rows={3}
        />
        <div className="flex flex-col space-y-2">
          <Button onClick={handleSend} disabled={isProcessing}>
            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
          <Button variant="secondary">
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

const Footer = () => {
  const appContext = React.useContext(AppContext)
  if (!appContext) {
    return null
  }
  const { reportProgress, wordCount, characterCount, autoSave, setAutoSave, keywords, tags, setTags, reportQualityScore } = appContext
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [newTag, setNewTag] = useState('')
  const { toast } = useToast()

  const addTag = useCallback(() => {
    if (newTag && !tags.includes(newTag)) {
      setTags(prevTags => [...prevTags, newTag])
      setNewTag('')
      setIsAddingTag(false)
      toast({ title: "Tag added successfully", description: `"${newTag}" has been added to your report tags.` })
    }
  }, [newTag, tags, setTags, toast])

  const removeTag = useCallback((tagToRemove: string) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove))
    toast({ title: "Tag removed", description: `"${tagToRemove}" has been removed from your report tags.` })
  }, [setTags, toast])

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-t p-4 flex justify-between items-center bg-background"
    >
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Sliders className="h-4 w-4 mr-2" />
          Score Report
        </Button>
        <span className="text-sm text-muted-foreground">Words: {wordCount} | Characters: {characterCount}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Report Progress:</span>
        <Progress value={reportProgress} className="w-64" style={{ backgroundColor: '#00CED1' }} />
        <span className="text-sm text-muted-foreground">{reportProgress}%</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Report Quality Score:</span>
        <Progress value={reportQualityScore} max={100} className="w-32" />
        <span className="text-sm text-muted-foreground">{reportQualityScore}/100</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Keywords:</span>
          {keywords && keywords.map((keyword, index) => (
            <Badge key={index} variant="secondary">{keyword}</Badge>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Tags:</span>
          {tags && tags.length > 0 ? (
            tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeTag(tag)}>
                {tag} <X className="h-3 w-3 ml-1" />
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">NONE</span>
          )}
          <Button variant="outline" size="sm" onClick={() => setIsAddingTag(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Mic className="h-4 w-4 mr-2" />
          Voice Input
        </Button>
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-save"
            checked={autoSave}
            onCheckedChange={setAutoSave}
          />
          <Label htmlFor="auto-save">Auto-save</Label>
        </div>
      </div>
      <Dialog open={isAddingTag} onOpenChange={setIsAddingTag}>
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>Add Tag</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={addTag}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.footer>
  )
}

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [content, setContent] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you with the radiology report today?' }
  ])
  const [reportProgress, setReportProgress] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [autoSave, setAutoSave] = useState(true)
  const [autoTextoTriggers, setAutoTextoTriggers] = useState([
    { id: 1, trigger: "/normal", content: "Normal study without significant abnormalities.", tags: ["normal", "study"], category: "General", conditions: ["No abnormalities detected"] },
    { id: 2, trigger: "/pneumonia", content: "Findings consistent with pneumonia in the right lower lobe.", tags: ["pneumonia", "lung"], category: "Chest", conditions: ["Opacity in right lower lobe", "Clinical history of cough and fever"] },
    { id: 3, trigger: "/fracture", content: "Acute fracture noted in the distal radius.", tags: ["fracture", "bone"], category: "Musculoskeletal", conditions: ["Linear lucency in distal radius", "Clinical history of fall"] }
  ])
  const [templates, setTemplates] = useState([
    { id: 1, name: "Basic Chest X-Ray", content: "TECHNIQUE:\n\nFINDINGS:\n\nIMPRESSION:", description: "Standard template for chest X-ray reports", modality: "X-Ray", bodyPart: "Chest", customFields: [{ name: "PatientAge", value: "" }, { name: "ClinicalIndication", value: "" }] },
    { id: 2, name: "Brain MRI", content: "TECHNIQUE:\n\nCOMPARISON:\n\nFINDINGS:\n\nIMPRESSION:", description: "Comprehensive template for brain MRI reports", modality: "MRI", bodyPart: "Brain", customFields: [{ name: "Contrast", value: "With and without contrast" }, { name: "Sequences", value: "T1, T2, FLAIR, DWI" }] }
  ])
  const [keywords, setKeywords] = useState(['normal', 'study'])
  const [notifications, setNotifications] = useState<string[]>([])
  const [collaborators, setCollaborators] = useState<string[]>([])
  const [userProfile, setUserProfile] = useState({
    name: 'Dr. John Doe',
    crm: '12345',
    crmState: 'SP',
    subspecialty: 'Neuroradiology',
    email: 'john.doe@hospital.com'
  })
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [studyInfo, setStudyInfo] = useState({
    accessionNumber: '',
    studyDate: '',
    modality: '',
    bodyPart: ''
  })
  const [clinicalHistory, setClinicalHistory] = useState('')
  const [findings, setFindings] = useState<string[]>([])
  const [impressions, setImpressions] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [criticalFindings, setCriticalFindings] = useState<string[]>([])
  const [reportVersions, setReportVersions] = useState<{ id: number; content: string; timestamp: Date }[]>([])
  const [currentReportVersion, setCurrentReportVersion] = useState(0)
  const [recentReports, setRecentReports] = useState<{ id: number; patientName: string; modality: string; date: string }[]>([])
  const [reportStatistics, setReportStatistics] = useState({
    totalReports: 0,
    averageWordsPerReport: 0,
    mostCommonModality: ''
  })
  const [macros, setMacros] = useState<{ id: number; name: string; content: string; category: string }[]>([])
  const [referenceMaterials, setReferenceMaterials] = useState<{ id: number; title: string; content: string; category: string }[]>([])
  const [measurementTools, setMeasurementTools] = useState<{ id: number; name: string; value: number; unit: string }[]>([])
  const [voiceCommands, setVoiceCommands] = useState<{ command: string; action: () => void }[]>([])
  const [reportQualityScore, setReportQualityScore] = useState(0)
  const [reportTemplateCategories, setReportTemplateCategories] = useState<string[]>([])
  const [customizationOptions, setCustomizationOptions] = useState({
    fontSize: 16,
    fontFamily: 'Arial',
    lineSpacing: 1.5
  })
  const [reportComments, setReportComments] = useState<{ id: number; user: string; content: string; timestamp: Date }[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<{ id: number; content: string; category: string }[]>([])
  const { toast } = useToast()

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }, [isDarkMode])

  const toggleSidebar = useCallback(() => setIsSidebarOpen(!isSidebarOpen), [isSidebarOpen])

  useEffect(() => {
    const words = content.trim().split(/\s+/).length
    const characters = content.length
    setWordCount(words)
    setCharacterCount(characters)
    setReportProgress(Math.min(100, Math.round((words / 500) * 100)))
  }, [content])

  useEffect(() => {
    if (autoSave) {
      const saveTimer = setTimeout(() => {
        saveReport()
      }, 30000)
      return () => clearTimeout(saveTimer)
    }
  }, [content, autoSave])

  const saveReport = useCallback(() => {
    console.log("Saving report...")
    createReportVersion()
    toast({ title: "Report saved successfully", description: "Your report has been automatically saved." })
  }, [toast])

  const exportReport = useCallback(() => {
    console.log("Exporting report...")
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'radiology_report.txt'
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Report exported successfully", description: "Your report has been downloaded as a text file." })
  }, [content, toast])

  const sendMessage = useCallback((message: string, role = 'user') => {
    setMessages(prevMessages => [
      ...(prevMessages || []),
      { role, content: message }
    ])
  }, [])

  const aiAssist = useCallback(() => {
    console.log("Requesting AI assistance...")
    toast({ title: "AI assistance requested", description: "AI is analyzing your report..." })
    setNotifications(prev => [...(prev || []), "AI is analyzing your report..."])
    setTimeout(() => {
      setKeywords(prev => [...(prev || []), 'AI-suggested'])
      setNotifications(prev => [...(prev || []), "AI analysis complete. New suggestions available."])
      toast({ title: "AI analysis complete", description: "New suggestions are available for your report." })
    }, 3000)
  }, [toast, setKeywords, setNotifications])

  const generateImpressions = useCallback(() => {
    console.log("Generating impressions...")
    toast({ title: "Generating impressions", description: "AI is creating impressions based on your report..." })
    setNotifications(prev => [...(prev || []), "AI is generating impressions..."])
    setTimeout(() => {
      setContent(prev => prev + "\n\nIMPRESSION:\n1. No acute cardiopulmonary process.\n2. Stable chronic changes.")
      setNotifications(prev => [...(prev ||  []), "Impressions generated and added to the report."])
      toast({ title: "Impressions generated", description: "New impressions have been added to your report." })
    }, 2000)
  }, [toast, setContent, setNotifications])

  const generateReport = useCallback(() => {
    console.log("Generating report...")
    toast({ title: "Generating report", description: "AI is creating a full report based on available information..." })
    setNotifications(prev => [...(prev || []), "AI is generating a full report..."])
    setTimeout(() => {
      setContent(`TECHNIQUE: PA and lateral views of the chest.

COMPARISON: None.

FINDINGS:
1. Lungs are clear without focal consolidation, effusion, or pneumothorax.
2. Heart size is normal.
3. Mediastinal contours are unremarkable.
4. Osseous structures show no acute abnormality.

IMPRESSION:
1. No acute cardiopulmonary process.`)
      setNotifications(prev => [...(prev || []), "Full report generated. Please review and edit as needed."])
      toast({ title: "Report generated", description: "A full report has been created. Please review and edit as needed." })
    }, 3000)
  }, [toast, setContent, setNotifications])

  const enhanceReport = useCallback(() => {
    console.log("Enhancing report...")
    toast({ title: "Enhancing report", description: "AI is improving the details and clarity of your report..." })
    setNotifications(prev => [...(prev || []), "AI is enhancing your report..."])
    setTimeout(() => {
      setContent(prev => prev.replace(
        "Lungs are clear without focal consolidation, effusion, or pneumothorax.",
        "Lungs are clear and well-expanded, without evidence of focal consolidation, pleural effusion, or pneumothorax. No suspicious pulmonary nodules or masses are identified."
      ))
      setKeywords(prev => [...(prev || []), 'enhanced'])
      setNotifications(prev => [...(prev || []), "Report enhanced with more detailed descriptions."])
      toast({ title: "Report enhanced", description: "Your report has been improved with more detailed descriptions." })
    }, 2000)
  }, [toast, setContent, setKeywords, setNotifications])

  const openUserProfile = useCallback(() => {
    setIsUserProfileOpen(true)
  }, [])

  const addFinding = useCallback((finding: string) => {
    setFindings(prevFindings => [...prevFindings, finding])
  }, [])

  const removeFinding = useCallback((index: number) => {
    setFindings(prevFindings => prevFindings.filter((_, i) => i !== index))
  }, [])

  const addImpression = useCallback((impression: string) => {
    setImpressions(prevImpressions => [...prevImpressions, impression])
  }, [])

  const removeImpression = useCallback((index: number) => {
    setImpressions(prevImpressions => prevImpressions.filter((_, i) => i !== index))
  }, [])

  const addRecommendation = useCallback((recommendation: string) => {
    setRecommendations(prevRecommendations => [...prevRecommendations, recommendation])
  }, [])

  const removeRecommendation = useCallback((index: number) => {
    setRecommendations(prevRecommendations => prevRecommendations.filter((_, i) => i !== index))
  }, [])

  const addCriticalFinding = useCallback((finding: string) => {
    setCriticalFindings(prevCriticalFindings => [...prevCriticalFindings, finding])
  }, [])

  const removeCriticalFinding = useCallback((index: number) => {
    setCriticalFindings(prevCriticalFindings => prevCriticalFindings.filter((_, i) => i !== index))
  }, [])

  const createReportVersion = useCallback(() => {
    const newVersion = {
      id: reportVersions.length + 1,
      content: content,
      timestamp: new Date()
    }
    setReportVersions(prevVersions => [...prevVersions, newVersion])
    setCurrentReportVersion(newVersion.id)
  }, [content, reportVersions.length])

  const switchReportVersion = useCallback((versionId: number) => {
    const version = reportVersions.find(v => v.id === versionId)
    if (version) {
      setContent(version.content)
      setCurrentReportVersion(versionId)
      toast({ title: "Version switched", description: `Switched to version ${versionId}` })
    }
  }, [reportVersions, setContent, toast])

  const compareReportVersions = useCallback((versionId1: number, versionId2: number) => {
    const version1 = reportVersions.find(v => v.id === versionId1)
    const version2 = reportVersions.find(v => v.id === versionId2)
    if (version1 && version2) {
      // Implement diff logic here
      console.log(`Comparing version ${versionId1} and ${versionId2}`)
      toast({ title: "Versions compared", description: `Comparison between version ${versionId1} and ${versionId2} is ready` })
    }
  }, [reportVersions, toast])

  const loadRecentReport = useCallback((reportId: number) => {
    const report = recentReports.find(r => r.id === reportId)
    if (report) {
      // Implement logic to load the report content
      console.log(`Loading report: ${report.patientName} - ${report.modality}`)
      toast({ title: "Report loaded", description: `Loaded report for ${report.patientName}` })
    }
  }, [recentReports, toast])

  const updateReportStatistics = useCallback(() => {
    // Implement logic to update report statistics
    setReportStatistics(prevStats => ({
      totalReports: prevStats.totalReports + 1,
      averageWordsPerReport: (prevStats.averageWordsPerReport * prevStats.totalReports + wordCount) / (prevStats.totalReports + 1),
      mostCommonModality: studyInfo.modality // This is a simplification, you'd need more complex logic for a real app
    }))
  }, [wordCount, studyInfo.modality])

  const addMacro = useCallback((name: string, content: string, category: string) => {
    const newMacro = {
      id: macros.length + 1,
      name,
      content,
      category
    }
    setMacros(prevMacros => [...prevMacros, newMacro])
    toast({ title: "Macro added", description: `New macro "${name}" has been added` })
  }, [macros.length, toast])

  const removeMacro = useCallback((id: number) => {
    setMacros(prevMacros => prevMacros.filter(m => m.id !== id))
    toast({ title: "Macro removed", description: "The selected macro has been removed" })
  }, [toast])

  const applyMacro = useCallback((id: number) => {
    const macro = macros.find(m => m.id === id)
    if (macro) {
      setContent(prevContent => prevContent + '\n' + macro.content)
      toast({ title: "Macro applied", description: `Macro "${macro.name}" has been applied to the report` })
    }
  }, [macros, setContent, toast])

  const addReferenceMaterial = useCallback((title: string, content: string, category: string) => {
    const newMaterial = {
      id: referenceMaterials.length + 1,
      title,
      content,
      category
    }
    setReferenceMaterials(prevMaterials => [...prevMaterials, newMaterial])
    toast({ title: "Reference material added", description: `New reference material "${title}" has been added` })
  }, [referenceMaterials.length, toast])

  const removeReferenceMaterial = useCallback((id: number) => {
    setReferenceMaterials(prevMaterials => prevMaterials.filter(m => m.id !== id))
    toast({ title: "Reference material removed", description: "The selected reference material has been removed" })
  }, [toast])

  const viewReferenceMaterial = useCallback((id: number) => {
    const material = referenceMaterials.find(m => m.id === id)
    if (material) {
      // Implement logic to display the full content of the reference material
      console.log(`Viewing reference material: ${material.title}`)
      toast({ title: "Reference material", description: `Viewing "${material.title}"` })
    }
  }, [referenceMaterials, toast])

  const addMeasurement = useCallback((name: string, value: number, unit: string) => {
    const newMeasurement = {
      id: measurementTools.length + 1,
      name,
      value,
      unit
    }
    setMeasurementTools(prevTools => [...prevTools, newMeasurement])
    toast({ title: "Measurement added", description: `New measurement "${name}" has been added` })
  }, [measurementTools.length, toast])

  const removeMeasurement = useCallback((id: number) => {
    setMeasurementTools(prevTools => prevTools.filter(m => m.id !== id))
    toast({ title: "Measurement removed", description: "The selected measurement has been removed" })
  }, [toast])

  const updateMeasurement = useCallback((id: number, value: number) => {
    setMeasurementTools(prevTools => prevTools.map(m => m.id === id ? { ...m, value } : m))
    toast({ title: "Measurement updated", description: "The measurement has been updated" })
  }, [toast])

  const addVoiceCommand = useCallback((command: string, action: () => void) => {
    setVoiceCommands(prevCommands => [...prevCommands, { command, action }])
    toast({ title: "Voice command added", description: `New voice command "${command}" has been added` })
  }, [toast])

  const removeVoiceCommand = useCallback((command: string) => {
    setVoiceCommands(prevCommands => prevCommands.filter(vc => vc.command !== command))
    toast({ title: "Voice command removed", description: `Voice command "${command}" has been removed` })
  }, [toast])

  const executeVoiceCommand = useCallback((command: string) => {
    const voiceCommand = voiceCommands.find(vc => vc.command.toLowerCase() === command.toLowerCase())
    if (voiceCommand) {
      voiceCommand.action()
      toast({ title: "Voice command executed", description: `Executed voice command "${command}"` })
    } else {
      toast({ title: "Voice command not found", description: `No matching command found for "${command}"`, variant: "destructive" })
    }
  }, [voiceCommands, toast])

  const calculateReportQualityScore = useCallback(() => {
    // Implement logic to calculate report quality score
    // This is a simplified example
    const score = Math.min(100, Math.max(0, wordCount / 10 + findings.length * 5 + impressions.length * 10))
    setReportQualityScore(Math.round(score))
  }, [wordCount, findings.length, impressions.length])

  const addReportTemplateCategory = useCallback((category: string) => {
    if (!reportTemplateCategories.includes(category)) {
      setReportTemplateCategories(prevCategories => [...prevCategories, category])
      toast({ title: "Category added", description: `New template category "${category}" has been added` })
    }
  }, [reportTemplateCategories, toast])

  const removeReportTemplateCategory = useCallback((category: string) => {
    setReportTemplateCategories(prevCategories => prevCategories.filter(c => c !== category))
    toast({ title: "Category removed", description: `Template category "${category}" has been removed` })
  }, [toast])

  const updateCustomizationOption = useCallback((option: string, value: number | string) => {
    setCustomizationOptions(prevOptions => ({ ...prevOptions, [option]: value }))
    toast({ title: "Customization updated", description: `${option} has been updated to ${value}` })
  }, [toast])

  const addReportComment = useCallback((user: string, content: string) => {
    const newComment = {
      id: reportComments.length + 1,
      user,
      content,
      timestamp: new Date()
    }
    setReportComments(prevComments => [...prevComments, newComment])
    toast({ title: "Comment added", description: "Your comment has been added to the report" })
  }, [reportComments.length, toast])

  const removeReportComment = useCallback((id: number) => {
    setReportComments(prevComments => prevComments.filter(c => c.id !== id))
    toast({ title: "Comment removed", description: "The selected comment has been removed" })
  }, [toast])

  const generateAiSuggestion = useCallback((category: string) => {
    // Simulate AI generating a suggestion
    setTimeout(() => {
      const newSuggestion = {
        id: aiSuggestions.length + 1,
        content: `AI-generated suggestion for ${category}: Consider adding more details about...`,
        category
      }
      setAiSuggestions(prevSuggestions => [...prevSuggestions, newSuggestion])
      toast({ title: "AI Suggestion", description: "A new AI suggestion has been generated" })
    }, 1000)
  }, [aiSuggestions.length, toast])

  const applyAiSuggestion = useCallback((id: number) => {
    const suggestion = aiSuggestions.find(s => s.id === id)
    if (suggestion) {
      setContent(prevContent => prevContent + '\n' + suggestion.content)
      dismissAiSuggestion(id)
      toast({ title: "AI Suggestion applied", description: "The AI suggestion has been applied to your report" })
    }
  }, [aiSuggestions, setContent, toast])

  const dismissAiSuggestion = useCallback((id: number) => {
    setAiSuggestions(prevSuggestions => prevSuggestions.filter(s => s.id !== id))
    toast({ title: "AI Suggestion dismissed", description: "The AI suggestion has been dismissed" })
  }, [toast])

  const contextValue: AppContextType = {
    isDarkMode,
    setIsDarkMode,
    content,
    setContent,
    messages,
    setMessages,
    reportProgress,
    setReportProgress,
    wordCount,
    characterCount,
    autoSave,
    setAutoSave,
    autoTextoTriggers,
    setAutoTextoTriggers,
    templates,
    setTemplates,
    keywords,
    setKeywords,
    notifications,
    setNotifications,
    collaborators,
    setCollaborators,
    userProfile,
    setUserProfile,
    saveReport,
    exportReport,
    sendMessage,
    aiAssist,
    generateImpressions,
    generateReport,
    enhanceReport,
    openUserProfile,
    tags,
    setTags,
    studyInfo,
    setStudyInfo,
    clinicalHistory,
    setClinicalHistory,
    findings,
    setFindings,
    impressions,
    setImpressions,
    recommendations,
    setRecommendations,
    criticalFindings,
    setCriticalFindings,
    addFinding,
    removeFinding,
    addImpression,
    removeImpression,
    addRecommendation,
    removeRecommendation,
    addCriticalFinding,
    removeCriticalFinding,
    reportVersions,
    setReportVersions,
    currentReportVersion,
    setCurrentReportVersion,
    createReportVersion,
    switchReportVersion,
    compareReportVersions,
    recentReports,
    setRecentReports,
    loadRecentReport,
    reportStatistics,
    setReportStatistics,
    updateReportStatistics,
    macros,
    setMacros,
    addMacro,
    removeMacro,
    applyMacro,
    referenceMaterials,
    setReferenceMaterials,
    addReferenceMaterial,
    removeReferenceMaterial,
    viewReferenceMaterial,
    measurementTools,
    setMeasurementTools,
    addMeasurement,
    removeMeasurement,
    updateMeasurement,
    voiceCommands,
    setVoiceCommands,
    addVoiceCommand,
    removeVoiceCommand,
    executeVoiceCommand,
    reportQualityScore,
    setReportQualityScore,
    calculateReportQualityScore,
    reportTemplateCategories,
    setReportTemplateCategories,
    addReportTemplateCategory,
    removeReportTemplateCategory,
    customizationOptions,
    setCustomizationOptions,
    updateCustomizationOption,
    reportComments,
    setReportComments,
    addReportComment,
    removeReportComment,
    aiSuggestions,
    setAiSuggestions,
    generateAiSuggestion,
    applyAiSuggestion,
    dismissAiSuggestion
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Header toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <div className="flex-1 flex">
            {isSidebarOpen && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="w-64 p-4 border-r"
              >
                <AutoTexto />
              </motion.aside>
            )}
            <main className="flex-1 p-4">
              <Editor />
            </main>
            <aside className="w-80 p-4 border-l">
              <AIAssistant />
            </aside>
          </div>
          <Footer />
        </div>
      </div>
      <Dialog open={isUserProfileOpen} onOpenChange={setIsUserProfileOpen}>
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={userProfile.name}
                onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="crm">CRM</Label>
              <Input
                id="crm"
                value={userProfile.crm}
                onChange={(e) => setUserProfile({ ...userProfile, crm: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="crmState">CRM State</Label>
              <Input
                id="crmState"
                value={userProfile.crmState}
                onChange={(e) => setUserProfile({ ...userProfile, crmState: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="subspecialty">Subspecialty</Label>
              <Input
                id="subspecialty"
                value={userProfile.subspecialty}
                onChange={(e) => setUserProfile({ ...userProfile, subspecialty: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .custom-highlight::selection {
          background-color: #00CED1;
          color: white;
        }
      `}</style>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-2 cursor-help z-50">
              <HelpCircle className="h-6 w-6" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-sm">
            <h3 className="font-semibold mb-2">Advanced Features</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>AutoTexto:</strong> Use triggers to quickly insert predefined text.</li>
              <li><strong>AI Assistant:</strong> Get AI-powered suggestions and report enhancements.</li>
              <li><strong>Templates:</strong> Save and load report templates for quick starts.</li>
              <li><strong>Collaboration:</strong> Share and work on reports with colleagues.</li>
              <li><strong>Custom Highlighting:</strong> Easily identify important information.</li>
              <li><strong>Version Control:</strong> Track changes and compare report versions.</li>
              <li><strong>Measurement Tools:</strong> Add and manage measurements in your reports.</li>
              <li><strong>Voice Commands:</strong> Use voice input for hands-free reporting.</li>
              <li><strong>Quality Scoring:</strong> Get real-time feedback on report quality.</li>
              <li><strong>Reference Materials:</strong> Access relevant medical references while reporting.</li>
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </AppContext.Provider>
  )
}