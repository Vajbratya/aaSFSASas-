'use client'

import React, { useState, useEffect, createContext, useRef, useCallback, useMemo } from 'react'
import { 
  Bell, Clock, Sun, Moon, Save, Download, Mic, Sparkles, 
  FileText, Settings, Menu, Plus, Send, ChevronRight, 
  Brain, Lightbulb, Wand2, Bold, Italic, Underline, AlignLeft, AlignCenter, 
  AlignRight, List, Heading1, Heading2, Heading3, Quote, Code, Link, Image, 
  Table, Search, User, LogOut, HelpCircle, Sliders, AlertTriangle, CheckCircle, 
  Trash2, RotateCcw, Printer, Paperclip, 
  Flag, Tag, Loader2,
  Users, Edit, MicOff, ArrowUpRight, TestTube,
  ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

// Definindo os componentes Tabs localmente
const Tabs = TabsPrimitive.Root
const TabsList = TabsPrimitive.List
const TabsTrigger = TabsPrimitive.Trigger
const TabsContent = TabsPrimitive.Content

// ... (resto do código do componente)

export default function EditorTabs() {
  // ... (todo o código que estava em tabs.tsx)
}
