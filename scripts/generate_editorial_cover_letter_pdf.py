import os
import random
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

# ==============================================================================
# CONFIGURATION SWITCHES
# ==============================================================================
ENABLE_AMBIENT_BUBBLES = True   # Set to False to completely remove background bubbles

def draw_ambient_bubbles(c, page_w, page_h, seed=42):
    """
    Renders soft pastel ambient floating bubbles in the background,
    matching the exact webpage simulation (#f59e0b, #ef4444, #22c55e, #9333ea, #0ea5e9).
    """
    rng = random.Random(seed)
    bubble_palette = [
        (colors.HexColor("#f59e0b"), 0.38),  # Warm Golden Amber
        (colors.HexColor("#ef4444"), 0.32),  # Coral Blush
        (colors.HexColor("#22c55e"), 0.34),  # Sage Mint
        (colors.HexColor("#9333ea"), 0.34),  # Iris Lavender
        (colors.HexColor("#0ea5e9"), 0.36),  # Sky Blue
    ]
    for _ in range(75):
        x = rng.uniform(4, page_w - 4)
        y = rng.uniform(4, page_h - 4)
        radius = rng.uniform(3.5, 12.0)  # Discrete, elegant smaller radii
        color, alpha = rng.choice(bubble_palette)
        
        c.saveState()
        c.setFillColor(color)
        c.setFillAlpha(alpha)
        c.setStrokeAlpha(0)
        c.circle(x, y, radius, fill=1, stroke=0)
        c.restoreState()

def generate_editorial_cover_letter(show_bubbles=ENABLE_AMBIENT_BUBBLES):
    pdf_filename = "/home/cromero/Desktop/cool-cv/Carlos_Romero_Cover_Letter.pdf"
    page_w, page_h = A4 # 595.27 x 841.89 pt
    
    # Elegant, centered margins
    page_margin = 28
    c = canvas.Canvas(pdf_filename, pagesize=A4)
    c.setTitle("Cover Letter — Carlos Romero Madrid (Data Analytics & Visualization Group, BSC)")
    c.setAuthor("Carlos Romero Madrid")
    
    # 1. OPTIONAL AMBIENT BACKGROUND BUBBLES
    if show_bubbles:
        draw_ambient_bubbles(c, page_w, page_h, seed=101)
    
    # 2. TOP BANNER (WARM VANILLA) - Exactly matching the CV header
    header_h = 56
    header_w = page_w - (page_margin * 2)
    header_x = page_margin
    header_y = page_h - page_margin - header_h
    
    P_VANILLA_BG = colors.HexColor("#fff9ea")
    P_VANILLA_BORDER = colors.HexColor("#fee8b0")
    P_VANILLA_TITLE = colors.HexColor("#78350f")
    P_VANILLA_SUB = colors.HexColor("#b45309")
    
    c.saveState()
    c.setFillColor(P_VANILLA_BG)
    c.setStrokeColor(P_VANILLA_BORDER)
    c.setLineWidth(1)
    c.setFillAlpha(0.85)
    c.roundRect(header_x, header_y, header_w, header_h, 7, fill=1, stroke=1)
    c.restoreState()
    
    c.setFillColor(P_VANILLA_TITLE)
    c.setFont("Helvetica-Bold", 17)
    c.drawString(header_x + 16, header_y + header_h - 22, "Carlos Romero Madrid")
    
    c.setFillColor(P_VANILLA_SUB)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(header_x + 16, header_y + header_h - 36, "Computational Physicist · HPC Software Engineer · Creative Technologist")
    c.setFont("Helvetica", 7.5)
    c.setFillColor(colors.HexColor("#78350f"))
    c.drawString(header_x + 16, header_y + header_h - 48, "Barcelona Supercomputing Center (BSC-CNS) · Data Art & Physical Computing")
    
    # Contact Right Column
    c.setFillColor(P_VANILLA_TITLE)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawRightString(header_x + header_w - 16, header_y + header_h - 20, "carrommad@gmail.com · carlos.romero@bsc.es")
    c.setFont("Helvetica", 7.2)
    c.setFillColor(colors.HexColor("#92400e"))
    c.drawRightString(header_x + header_w - 16, header_y + header_h - 33, "+34 611 423 133 · Barcelona, Spain")
    c.drawRightString(header_x + header_w - 16, header_y + header_h - 46, "linkedin.com/in/carrommad · github.com/carrommad")
    
    # --------------------------------------------------------------------------
    # 3. CENTERED EDITORIAL LETTER MONOLITH
    # --------------------------------------------------------------------------
    body_y = page_margin
    body_h = header_y - page_margin - 12
    body_w = header_w
    body_x = page_margin
    
    # Centered Outer Card (Glassmorphic white)
    c.saveState()
    c.setFillColor(colors.HexColor("#ffffff"))
    c.setStrokeColor(colors.HexColor("#e2e8f0"))
    c.setLineWidth(1)
    c.setFillAlpha(0.72)
    c.roundRect(body_x, body_y, body_w, body_h, 8, fill=1, stroke=1)
    c.restoreState()
    
    # Meta / Recipient Bar inside card (Pastel Sky Blue #e8f4fc)
    meta_bar_h = 42
    meta_bar_y = body_y + body_h - meta_bar_h - 16
    meta_bar_x = body_x + 18
    meta_bar_w = body_w - 36
    
    c.saveState()
    c.setFillColor(colors.HexColor("#e8f4fc"))
    c.setStrokeColor(colors.HexColor("#cbe6fa"))
    c.setLineWidth(1)
    c.setFillAlpha(0.85)
    c.roundRect(meta_bar_x, meta_bar_y, meta_bar_w, meta_bar_h, 6, fill=1, stroke=1)
    c.restoreState()
    
    # Meta Text: Recipient (Left) & Application Statement (Right)
    c.setFillColor(colors.HexColor("#0369a1"))
    c.setFont("Helvetica-Bold", 8)
    c.drawString(meta_bar_x + 14, meta_bar_y + meta_bar_h - 14, "TO: FERNANDO CUCCHIETTI & SELECTION COMMITTEE")
    c.setFont("Helvetica", 7.2)
    c.setFillColor(colors.HexColor("#334155"))
    c.drawString(meta_bar_x + 14, meta_bar_y + 11, "Data Analytics & Visualization Group (DAV) · BSC-CNS")
    
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(colors.HexColor("#0284c7"))
    c.drawRightString(meta_bar_x + meta_bar_w - 14, meta_bar_y + meta_bar_h - 14, "APPLICATION STATEMENT")
    c.setFont("Helvetica", 7.2)
    c.setFillColor(colors.HexColor("#64748b"))
    c.drawRightString(meta_bar_x + meta_bar_w - 14, meta_bar_y + 11, "Creative Computing & Data Storytelling · 2026")
    
    # Typography Styles
    styles = getSampleStyleSheet()
    
    p_lead = ParagraphStyle(
        'LeadSalutation',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.6,
        leading=14.5,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=7
    )
    
    p_body = ParagraphStyle(
        'MainLetterBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.2,
        leading=14.2,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=9
    )
    
    p_manifesto = ParagraphStyle(
        'ManifestoQuote',
        parent=p_body,
        fontName='Helvetica-Oblique',
        fontSize=9.0,
        leading=13.8,
        textColor=colors.HexColor('#14532d'),
        spaceAfter=0
    )
    
    # Content insertion position
    curr_y = meta_bar_y - 18
    text_x = body_x + 22
    text_w = body_w - 44
    
    # Salutation
    p_salut = Paragraph("Dear Fernando and Members of the Data Analytics and Visualization Group,", p_lead)
    w, h = p_salut.wrap(text_w, 100)
    p_salut.drawOn(c, text_x, curr_y - h)
    curr_y -= (h + 9)
    
    # Paragraph 1: The Hook & Contrast
    p1_text = "Most resumes start with an enumeration of computational libraries. Let me start with a contrast: the low acoustic hum of <b>MareNostrum 5</b> solving fluid turbulence across thousands of GPU cores, against the gentle harmonic chime of an interactive kinetic sphere when my cat <b>Pipa</b> taps it across the floor."
    p1 = Paragraph(p1_text, p_body)
    w, h = p1.wrap(text_w, 200)
    p1.drawOn(c, text_x, curr_y - h)
    curr_y -= (h + 10)
    
    # Paragraph 2: Profile & Core Conviction
    p2_text = "I am a <b>Computational Physicist</b> (Double Degree in Physics & Mathematics from the University of Seville, 1st of Class MSc in Plasma Physics at Aix-Marseille) and an <b>HPC Scientific Software Engineer</b> at BSC. Every day, I profile, refactor, and scale massively parallel solvers on Europe’s flagship supercomputers (MN5, Leonardo, LUMI). Yet my strongest conviction is that <i>if petabytes of scientific breakthroughs stay trapped in cold terminal outputs and static papers, we have only realized half of science's societal promise.</i>"
    p2 = Paragraph(p2_text, p_body)
    w, h = p2.wrap(text_w, 200)
    p2.drawOn(c, text_x, curr_y - h)
    curr_y -= (h + 10)
    
    # Centered Manifesto Callout Box (Pastel Mint #eaf6ee)
    box_pad = 8
    manifesto_html = "<b>The Domestic Data Streamers Philosophy:</b> Much like the visionary spatial storytelling of <i>Domestic Data Streamers</i>, I believe data is a living, sensory medium. Translating extreme HPC simulations into tangible, interactive public experiences turns abstract complexity into emotional human discovery."
    p_man = Paragraph(manifesto_html, p_manifesto)
    mw, mh = p_man.wrap(text_w - (box_pad * 2), 150)
    
    c.saveState()
    c.setFillColor(colors.HexColor("#eaf6ee"))
    c.setStrokeColor(colors.HexColor("#cdecd5"))
    c.setLineWidth(1)
    c.setFillAlpha(0.85)
    c.roundRect(text_x, curr_y - mh - (box_pad * 2), text_w, mh + (box_pad * 2), 6, fill=1, stroke=1)
    c.restoreState()
    
    p_man.drawOn(c, text_x + box_pad, curr_y - mh - box_pad)
    curr_y -= (mh + (box_pad * 2) + 12)
    
    # Paragraph 3: Creative Practice & Convergence
    p3_text = "In my independent creative studio, I investigate how physical hardware, generative audio, and motion design transform technical data into visceral encounters. My goal is to bring this exact dual proficiency—deep mathematical and high-performance computational mastery paired with sensory empathy—directly into the <b>Data Analytics and Visualization Group</b>. Whether engineering real-time digital twins (<b>GDU-HPC</b>), communicating urban climate resilience (<b>AIR / REALLOCATE</b>), or curating interactive physical museum installations, I look forward to building experiences that captivate visitors and elevate public understanding of science."
    p3 = Paragraph(p3_text, p_body)
    w, h = p3.wrap(text_w, 200)
    p3.drawOn(c, text_x, curr_y - h)
    curr_y -= (h + 14)
    
    # --------------------------------------------------------------------------
    # 4. HORIZONTAL 3-PILLAR ANCHOR CARD (Eliminates bottom void & anchors layout)
    # --------------------------------------------------------------------------
    anchor_h = 76
    anchor_y = curr_y - anchor_h
    anchor_w = text_w
    anchor_x = text_x
    
    # Outer container for the 3 pillars
    c.saveState()
    c.setFillColor(colors.HexColor("#f8fafc"))
    c.setStrokeColor(colors.HexColor("#e2e8f0"))
    c.setLineWidth(1)
    c.setFillAlpha(0.85)
    c.roundRect(anchor_x, anchor_y, anchor_w, anchor_h, 6, fill=1, stroke=1)
    c.restoreState()
    
    # Top banner of anchor
    c.setFont("Helvetica-Bold", 7.2)
    c.setFillColor(colors.HexColor("#64748b"))
    c.drawString(anchor_x + 12, anchor_y + anchor_h - 13, "PORTFOLIO HIGHLIGHTS · TANGIBLE COMPUTING & SCIENTIFIC OUTREACH")
    
    c.setStrokeColor(colors.HexColor("#e2e8f0"))
    c.setLineWidth(0.8)
    c.line(anchor_x + 12, anchor_y + anchor_h - 18, anchor_x + anchor_w - 12, anchor_y + anchor_h - 18)
    
    # 3 Balanced Columns
    col_w = (anchor_w - 40) / 3
    
    p_desc_style = ParagraphStyle(
        'PillarDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=6.8,
        leading=9.2,
        textColor=colors.HexColor('#475569')
    )
    
    pillars_data = [
        ("MNusic Engine", "Sonic & Visual MN5", "Real-time supercomputer telemetry translated to generative ambient audio and particle dynamics."),
        ("Pipa-Music-Ball", "Bio-Kinetic Physical UX", "ESP32 + 6-DoF inertial sphere translating feline kinetic vectors into microtonal acoustics."),
        ("Expo-Curator", "Exhibition Staging", "Open curation platform for automated wall layout, booklet design, and gallery flow.")
    ]
    
    for i, (p_title, p_sub, p_desc) in enumerate(pillars_data):
        cx = anchor_x + 12 + i * (col_w + 8)
        cy = anchor_y + anchor_h - 26
        
        c.setFont("Helvetica-Bold", 8.2)
        c.setFillColor(colors.HexColor("#0284c7") if i == 0 else (colors.HexColor("#15803d") if i == 1 else colors.HexColor("#6d28d9")))
        c.drawString(cx, cy, p_title)
        
        c.setFont("Helvetica-Bold", 6.8)
        c.setFillColor(colors.HexColor("#0f172a"))
        c.drawString(cx, cy - 9, p_sub)
        
        p_desc_obj = Paragraph(p_desc, p_desc_style)
        pw, ph = p_desc_obj.wrap(col_w - 4, 60)
        p_desc_obj.drawOn(c, cx, cy - 12 - ph)
            
    curr_y = anchor_y - 18
    
    # --------------------------------------------------------------------------
    # 5. FORMAL SIGN-OFF & SIGNATURE
    # --------------------------------------------------------------------------
    c.setFont("Helvetica", 8.8)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(text_x, curr_y, "With sincere enthusiasm and warm regards,")
    
    curr_y -= 16
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(colors.HexColor("#0369a1"))
    c.drawString(text_x, curr_y, "Carlos Romero Madrid")
    
    curr_y -= 11
    c.setFont("Helvetica-Oblique", 7.8)
    c.setFillColor(colors.HexColor("#64748b"))
    c.drawString(text_x, curr_y, "Computational Physicist & Creative Technologist · Barcelona Supercomputing Center (BSC-CNS)")
    
    # Save Canvas
    c.showPage()
    c.save()
    print("Exported Centered Editorial Cover Letter PDF successfully!")

if __name__ == "__main__":
    generate_editorial_cover_letter()
