import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas

def generate_quadrant_cover_letter():
    pdf_filename = "/home/cromero/Desktop/cool-cv/Carlos_Romero_Cover_Letter.pdf"
    
    # Dimensions of A4 in points
    page_w, page_h = A4 # 595.27 x 841.89 pt
    margin = 22 # Outer margin
    gap = 12    # Gap between quadrants
    
    c = canvas.Canvas(pdf_filename, pagesize=A4)
    c.setTitle("Cover Letter — Carlos Romero Madrid (Data Analytics & Visualization Group)")
    c.setAuthor("Carlos Romero Madrid")
    
    # Calculate quadrant box sizes
    box_w = (page_w - (margin * 2) - gap) / 2 # ~264.6 pt
    box_h = (page_h - (margin * 2) - gap) / 2 # ~387.9 pt
    
    # Coordinates of 4 Quadrants: (x, y) bottom-left
    # Q1: Top-Left  (margin, margin + box_h + gap)
    # Q2: Top-Right (margin + box_w + gap, margin + box_h + gap)
    # Q3: Bottom-Left (margin, margin)
    # Q4: Bottom-Right (margin + box_w + gap, margin)
    
    # PASTEL PALETTE (Hex)
    P_CORAL_BG = colors.HexColor("#ffebe9")      # Quadrant 1
    P_CORAL_BORDER = colors.HexColor("#ffd2cc")
    P_CORAL_ACCENT = colors.HexColor("#c83226")
    P_CORAL_TITLE = colors.HexColor("#8a1d14")
    
    P_MINT_BG = colors.HexColor("#eaf6ee")       # Quadrant 2
    P_MINT_BORDER = colors.HexColor("#cdecd5")
    P_MINT_ACCENT = colors.HexColor("#15803d")
    P_MINT_TITLE = colors.HexColor("#14532d")
    
    P_LAVENDER_BG = colors.HexColor("#f1edfb")   # Quadrant 3
    P_LAVENDER_BORDER = colors.HexColor("#ded6f7")
    P_LAVENDER_ACCENT = colors.HexColor("#6d28d9")
    P_LAVENDER_TITLE = colors.HexColor("#4c1d95")
    
    P_SKY_BG = colors.HexColor("#e8f4fc")        # Quadrant 4
    P_SKY_BORDER = colors.HexColor("#cbe6fa")
    P_SKY_ACCENT = colors.HexColor("#0284c7")
    P_SKY_TITLE = colors.HexColor("#0369a1")
    
    C_TEXT = colors.HexColor("#1e293b")
    C_MUTED = colors.HexColor("#475569")
    
    # Helper to draw rounded rectangle quadrant
    def draw_box(x, y, bg_color, border_color, q_num):
        c.setFillColor(bg_color)
        c.setStrokeColor(border_color)
        c.setLineWidth(1)
        c.roundRect(x, y, box_w, box_h, 8, fill=1, stroke=1)
        
        # Quadrant Number Watermark
        c.setFillColor(colors.HexColor("#000000"))
        c.setFillAlpha(0.06)
        c.setFont("Helvetica-Bold", 32)
        c.drawRightString(x + box_w - 14, y + box_h - 34, q_num)
        c.setFillAlpha(1.0)
    
    # ==========================================
    # QUADRANT 1: TOP-LEFT (PASTEL CORAL / BLUSH)
    # The Sensory Hook & Science Democratization
    # ==========================================
    x1 = margin
    y1 = margin + box_h + gap
    draw_box(x1, y1, P_CORAL_BG, P_CORAL_BORDER, "01")
    
    # Header tag
    c.setFillColor(P_CORAL_ACCENT)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(x1 + 16, y1 + box_h - 22, "I. GENESIS · SENSORY DATA")
    
    # Title
    c.setFillColor(P_CORAL_TITLE)
    c.setFont("Helvetica-Bold", 12.5)
    c.drawString(x1 + 16, y1 + box_h - 38, "A Sound Instead of a Buzzword")
    
    # Body
    textobject = c.beginText(x1 + 16, y1 + box_h - 58)
    textobject.setFont("Helvetica", 8.2)
    textobject.setLeading(12.5)
    textobject.setFillColor(C_TEXT)
    
    paras_q1 = [
        "Most resumes begin with a dense list of corporate",
        "buzzwords. Let me begin with a sound:",
        "",
        "The deep mechanical hum of MareNostrum 5 calculating",
        "climate turbulence across thousands of GPUs, or the",
        "gentle chime of a motion-sensing sphere when my cat",
        "Pipa knocks it across the living room floor.",
        "",
        "Data is not just an analytical output to be confined to rows",
        "and columns. Inspired by Domestic Data Streamers,",
        "I believe data is a living physical material—something to",
        "be felt, touched, heard, and inhabited.",
        "",
        "Modern science is uncovering the fundamental",
        "mechanics of our world, but when those breakthroughs",
        "remain trapped behind cold cluster logs and impenetrable",
        "matrices, we have only completed half the mission.",
        "",
        "My conviction is the democratization of science: turning",
        "invisible computational realities into unforgettable,",
        "sensorial human stories that touch non-specialists."
    ]
    for line in paras_q1:
        textobject.textLine(line)
    c.drawText(textobject)
    
    # ==========================================
    # QUADRANT 2: TOP-RIGHT (PASTEL MINT / SAGE)
    # Theoretical Physics Rigour & Extreme HPC
    # ==========================================
    x2 = margin + box_w + gap
    y2 = margin + box_h + gap
    draw_box(x2, y2, P_MINT_BG, P_MINT_BORDER, "02")
    
    c.setFillColor(P_MINT_ACCENT)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(x2 + 16, y2 + box_h - 22, "II. RIGOUR · EXTREME COMPUTE")
    
    c.setFillColor(P_MINT_TITLE)
    c.setFont("Helvetica-Bold", 12.5)
    c.drawString(x2 + 16, y2 + box_h - 38, "From First-Principles to Tier-0")
    
    textobject2 = c.beginText(x2 + 16, y2 + box_h - 58)
    textobject2.setFont("Helvetica", 8.2)
    textobject2.setLeading(12.2)
    textobject2.setFillColor(C_TEXT)
    
    paras_q2 = [
        "My creative impulses are anchored in genuine first-",
        "principles physics and high-performance software rigour:",
        "",
        "• Double Degree in Physics & Mathematics",
        "  (Univ. of Seville, 2013–2018 · 8.35/10 · 3rd of Class)",
        "• MSc in Plasma & Fusion Physics",
        "  (Aix-Marseille Univ., 2019–2020 · 15.43/20 · 1st of Class)",
        "",
        "• BSC Performance Team (May 2025 – Present):",
        "  Contributing to ocean-atmosphere coupling in European",
        "  digital twins (DestinationE & ClimateDT); ECLand model",
        "  advancement; deploying workflows on MareNostrum 5.",
        "",
        "• Fusion Team & CENER Background:",
        "  Optimizing Tier-0 fusion solvers (OpenMP, MPI, PETSc,",
        "  OpenACC, oneAPI); ALYA-MAGNET modeling; building",
        "  real-time predictive wind plant telemetry pipelines.",
        "",
        "• AI-Assisted Engineering:",
        "  I treat LLMs as fluid thought-partners, bouncing",
        "  rapidly from C++/Fortran HPC kernels to browser sound",
        "  design, motion graphics, and hardware firmware."
    ]
    for line in paras_q2:
        textobject2.textLine(line)
    c.drawText(textobject2)
    
    # ==========================================
    # QUADRANT 3: BOTTOM-LEFT (PASTEL LAVENDER)
    # The 4 Creative Computing Projects
    # ==========================================
    x3 = margin
    y3 = margin
    draw_box(x3, y3, P_LAVENDER_BG, P_LAVENDER_BORDER, "03")
    
    c.setFillColor(P_LAVENDER_ACCENT)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(x3 + 16, y3 + box_h - 22, "III. STUDIO · PHYSICAL COMPUTING")
    
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 12.5)
    c.drawString(x3 + 16, y3 + box_h - 38, "Four Creative Experiments")
    
    # Project 1: MNusic
    c.setFillColor(colors.HexColor("#ffffff"))
    c.roundRect(x3 + 14, y3 + box_h - 118, box_w - 28, 68, 5, fill=1, stroke=0)
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(x3 + 20, y3 + box_h - 60, "MNusic — Listening to & Visualizing MN5 & LUMI")
    c.setFont("Helvetica", 7.4)
    c.setFillColor(C_TEXT)
    c.drawString(x3 + 20, y3 + box_h - 73, "• Sonifies cluster power, GPU load & thermal gradients into")
    c.drawString(x3 + 20, y3 + box_h - 84, "  harmonic ambient soundscapes (Web Audio API) & particles.")
    c.drawString(x3 + 20, y3 + box_h - 95, "• Transforms abstract petascale algorithms into audible life.")
    c.drawString(x3 + 20, y3 + box_h - 106, "• Stack: HPC Telemetry, Web Audio, HTML5 Canvas, AI pairing.")
    
    # Project 2: Pipa-Music-Ball
    c.setFillColor(colors.HexColor("#ffffff"))
    c.roundRect(x3 + 14, y3 + box_h - 198, box_w - 28, 70, 5, fill=1, stroke=0)
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(x3 + 20, y3 + box_h - 138, "Pipa-Music-Ball — Bio-Kinetic Interactive Artifact")
    c.setFont("Helvetica", 7.4)
    c.setFillColor(C_TEXT)
    c.drawString(x3 + 20, y3 + box_h - 151, "• Embedded physical sphere (ESP32, 6-DoF IMU) that turns")
    c.drawString(x3 + 20, y3 + box_h - 162, "  cat kinetic play into microtonal scales & acoustic chimes.")
    c.drawString(x3 + 20, y3 + box_h - 173, "• Tangible proof of non-anthropocentric playful data design.")
    c.drawString(x3 + 20, y3 + box_h - 184, "• Stack: Microcontrollers, I2S DAC, inertial sensing, 3D body.")
    
    # Project 3: Expo-Curator
    c.setFillColor(colors.HexColor("#ffffff"))
    c.roundRect(x3 + 14, y3 + box_h - 278, box_w - 28, 70, 5, fill=1, stroke=0)
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(x3 + 20, y3 + box_h - 218, "Expo-Curator — github.com/carrommad/expo-curator")
    c.setFont("Helvetica", 7.4)
    c.setFillColor(C_TEXT)
    c.drawString(x3 + 20, y3 + box_h - 231, "• Image curation, automated sub-classification, booklet design,")
    c.drawString(x3 + 20, y3 + box_h - 242, "  and spatial exhibition wall layout generator for galleries.")
    c.drawString(x3 + 20, y3 + box_h - 253, "• Directly serves the staging needs of data art exhibitions.")
    c.drawString(x3 + 20, y3 + box_h - 264, "• Stack: Python/JS, layout geometry, automated taxonomy.")
    
    # Project 4: Lens & Motion
    c.setFillColor(colors.HexColor("#ffffff"))
    c.roundRect(x3 + 14, y3 + box_h - 358, box_w - 28, 70, 5, fill=1, stroke=0)
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(x3 + 20, y3 + box_h - 298, "Lens & Motion — Photography & Adobe After Effects")
    c.setFont("Helvetica", 7.4)
    c.setFillColor(C_TEXT)
    c.drawString(x3 + 20, y3 + box_h - 311, "• Still photography composition (framing, geometric light)")
    c.drawString(x3 + 20, y3 + box_h - 322, "  paired with procedural motion graphics & kinetic typography.")
    c.drawString(x3 + 20, y3 + box_h - 333, "• Turns scientific findings into broadcast-grade video reels.")
    c.drawString(x3 + 20, y3 + box_h - 344, "• Stack: Adobe After Effects, color grading, visual rhythm.")
    
    # ==========================================
    # QUADRANT 4: BOTTOM-RIGHT (PASTEL SKY BLUE)
    # Direct DAV Group Synergy & Signoff
    # ==========================================
    x4 = margin + box_w + gap
    y4 = margin
    draw_box(x4, y4, P_SKY_BG, P_SKY_BORDER, "04")
    
    c.setFillColor(P_SKY_ACCENT)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(x4 + 16, y4 + box_h - 22, "IV. CONVERGENCE · FUTURE ACTION")
    
    c.setFillColor(P_SKY_TITLE)
    c.setFont("Helvetica-Bold", 12.5)
    c.drawString(x4 + 16, y4 + box_h - 38, "Synergy with DAV & Fernando Cucchietti")
    
    textobject4 = c.beginText(x4 + 16, y4 + box_h - 58)
    textobject4.setFont("Helvetica", 8.2)
    textobject4.setLeading(12.0)
    textobject4.setFillColor(C_TEXT)
    
    paras_q4 = [
        "Following your workshops and tracking your flagship initiatives",
        "reveals an organic convergence with my skills and passion:",
        "",
        "• GDU-HPC (Gemelo Digital Urbano):",
        "  Direct synergy with my HPC digital twin workflow at BSC",
        "  (DestinationE & ClimateDT) and large-scale urban analytics.",
        "",
        "• AIR (Air for European Resilience):",
        "  Connecting fluid/atmospheric physics (MSc Plasma & Fluid)",
        "  with participatory public environmental storytelling.",
        "",
        "• REALLOCATE (Climate-Friendly Active Mobility):",
        "  Data visualization for rethinking street design & emissions.",
        "",
        "Your 5 core lines (Scientific Viz, Interactive Viz, Industrial AI,",
        "Creative Intelligence, Urban Data) are exactly where I belong.",
        "",
        "I don't just want to watch from the audience—I want to join",
        "Fernando Cucchietti and the team to engineer the most",
        "daring, memorable scientific data installations in the world."
    ]
    for line in paras_q4:
        textobject4.textLine(line)
    c.drawText(textobject4)
    
    # Signoff Box at Bottom
    c.setStrokeColor(colors.HexColor("#cbe6fa"))
    c.setLineWidth(1)
    c.line(x4 + 16, y4 + 58, x4 + box_w - 16, y4 + 58)
    
    c.setFillColor(colors.HexColor("#0f172a"))
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(x4 + 16, y4 + 42, "Carlos Romero Madrid")
    
    c.setFillColor(C_MUTED)
    c.setFont("Helvetica", 7.2)
    c.drawString(x4 + 16, y4 + 30, "Computational Physicist · HPC Scientific Software Engineer (BSC)")
    c.drawString(x4 + 16, y4 + 20, "Double Degree Physics & Mathematics · MSc Plasma Physics (1st)")
    
    c.setFillColor(P_SKY_TITLE)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawRightString(x4 + box_w - 16, y4 + 42, "carrommad@gmail.com")
    c.setFont("Helvetica", 7.2)
    c.drawRightString(x4 + box_w - 16, y4 + 30, "carlos.romero@bsc.es")
    c.drawRightString(x4 + box_w - 16, y4 + 20, "+34 611 423 133 · Barcelona")
    
    c.showPage()
    c.save()
    print("4-Quadrant Pastel Cover Letter PDF generated:", pdf_filename)

if __name__ == "__main__":
    generate_quadrant_cover_letter()
