import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas

# ==============================================================================
# CONFIGURATION SWITCHES
# ==============================================================================
ENABLE_AMBIENT_BUBBLES = True   # Set to False to completely remove background bubbles

def generate_pastel_boxes_cv(show_bubbles=ENABLE_AMBIENT_BUBBLES):
    pdf_filename = "/home/cromero/Desktop/cool-cv/Carlos_Romero_CV.pdf"
    
    page_w, page_h = A4 # 595.27 x 841.89 pt
    margin = 20
    gap = 10
    
    c = canvas.Canvas(pdf_filename, pagesize=A4)
    c.setTitle("Curriculum Vitae — Carlos Romero Madrid (Pastel Box Edition)")
    c.setAuthor("Carlos Romero Madrid")
    
    # --------------------------------------------------------------------------
    # OPTIONAL AMBIENT BUBBLES (Compact & Subtle)
    # --------------------------------------------------------------------------
    if show_bubbles:
        import random
        rng = random.Random(42)
        bubble_palette = [
            (colors.HexColor("#f59e0b"), 0.38),  # Warm Amber
            (colors.HexColor("#ef4444"), 0.32),  # Coral Blush
            (colors.HexColor("#22c55e"), 0.34),  # Sage Mint
            (colors.HexColor("#9333ea"), 0.34),  # Iris Lavender
            (colors.HexColor("#0ea5e9"), 0.36),  # Sky Blue
        ]
        for _ in range(80):
            bx = rng.uniform(4, page_w - 4)
            by = rng.uniform(4, page_h - 4)
            bradius = rng.uniform(3.5, 12.0)  # Smaller, discrete ambient dots (3.5 to 12 pt)
            bcolor, balpha = rng.choice(bubble_palette)
            c.saveState()
            c.setFillColor(bcolor)
            c.setFillAlpha(balpha)
            c.setStrokeAlpha(0)
            c.circle(bx, by, bradius, fill=1, stroke=0)
            c.restoreState()
    
    # 0. HEADER BANNER DIMENSIONS
    header_h = 56
    header_w = page_w - (margin * 2)
    header_x = margin
    header_y = page_h - margin - header_h
    
    # 4 CORE BOXES DIMENSIONS (2x2 Grid)
    box_w = (page_w - (margin * 2) - gap) / 2 # ~267 pt
    box_h = (header_y - margin - gap - gap) / 2 # ~362 pt
    
    # PASTEL COLOR PALETTE
    # Header: Vanilla
    P_VANILLA_BG = colors.HexColor("#fff9ea")
    P_VANILLA_BORDER = colors.HexColor("#fee8b0")
    P_VANILLA_TITLE = colors.HexColor("#78350f")
    P_VANILLA_SUB = colors.HexColor("#b45309")
    
    # Box 1: Pastel Coral (Experience & Trajectory)
    P_CORAL_BG = colors.HexColor("#ffebe9")
    P_CORAL_BORDER = colors.HexColor("#ffd2cc")
    P_CORAL_ACCENT = colors.HexColor("#c83226")
    P_CORAL_TITLE = colors.HexColor("#8a1d14")
    
    # Box 2: Pastel Mint (Academic Foundations & Tech Stack)
    P_MINT_BG = colors.HexColor("#eaf6ee")
    P_MINT_BORDER = colors.HexColor("#cdecd5")
    P_MINT_ACCENT = colors.HexColor("#15803d")
    P_MINT_TITLE = colors.HexColor("#14532d")
    
    # Box 3: Pastel Lavender (Creative Computing Projects)
    P_LAVENDER_BG = colors.HexColor("#f1edfb")
    P_LAVENDER_BORDER = colors.HexColor("#ded6f7")
    P_LAVENDER_ACCENT = colors.HexColor("#6d28d9")
    P_LAVENDER_TITLE = colors.HexColor("#4c1d95")
    
    # Box 4: Pastel Sky Blue (DAV Synergy & Democratization)
    P_SKY_BG = colors.HexColor("#e8f4fc")
    P_SKY_BORDER = colors.HexColor("#cbe6fa")
    P_SKY_ACCENT = colors.HexColor("#0284c7")
    P_SKY_TITLE = colors.HexColor("#0369a1")
    
    C_TEXT = colors.HexColor("#1e293b")
    C_MUTED = colors.HexColor("#475569")
    
    # ==========================================
    # 0. HEADER BANNER (WARM VANILLA WITH GLASS EFFECT)
    # ==========================================
    c.saveState()
    c.setFillColor(P_VANILLA_BG)
    c.setStrokeColor(P_VANILLA_BORDER)
    c.setLineWidth(1)
    c.setFillAlpha(0.85)
    c.roundRect(header_x, header_y, header_w, header_h, 7, fill=1, stroke=1)
    c.restoreState()
    
    c.setFillColor(P_VANILLA_TITLE)
    c.setFont("Helvetica-Bold", 17)
    c.drawString(header_x + 14, header_y + header_h - 22, "Carlos Romero Madrid")
    
    c.setFillColor(P_VANILLA_SUB)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(header_x + 14, header_y + header_h - 36, "Computational Physicist · HPC Software Engineer · Creative Technologist")
    c.setFont("Helvetica", 7.5)
    c.setFillColor(colors.HexColor("#78350f"))
    c.drawString(header_x + 14, header_y + header_h - 48, "Barcelona Supercomputing Center (BSC-CNS) · Data Art & Physical Computing")
    
    # Contact Right Column
    c.setFillColor(P_VANILLA_TITLE)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawRightString(header_x + header_w - 14, header_y + header_h - 20, "carrommad@gmail.com · carlos.romero@bsc.es")
    c.setFont("Helvetica", 7.2)
    c.setFillColor(colors.HexColor("#92400e"))
    c.drawRightString(header_x + header_w - 14, header_y + header_h - 33, "+34 611 423 133 · Barcelona, Spain")
    c.drawRightString(header_x + header_w - 14, header_y + header_h - 46, "linkedin.com/in/carrommad · github.com/carrommad")
    
    def draw_box(x, y, bg_color, border_color, q_num):
        c.saveState()
        c.setFillColor(bg_color)
        c.setStrokeColor(border_color)
        c.setLineWidth(1)
        c.setFillAlpha(0.68)  # Set alpha AFTER setFillColor so /ca is not overridden by color change!
        c.setStrokeAlpha(0.85)
        c.roundRect(x, y, box_w, box_h, 7, fill=1, stroke=1)
        c.restoreState()
        
        c.setFillColor(colors.HexColor("#000000"))
        c.setFillAlpha(0.06)
        c.setFont("Helvetica-Bold", 28)
        c.drawRightString(x + box_w - 12, y + box_h - 28, q_num)
        c.setFillAlpha(1.0)

    def draw_subcard(x, y, w, h, r=5):
        c.saveState()
        c.setFillColor(colors.HexColor("#ffffff"))
        c.setFillAlpha(0.62)  # Set alpha AFTER setFillColor so white is truly semi-transparent!
        c.roundRect(x, y, w, h, r, fill=1, stroke=0)
        c.restoreState()
    
    # ==========================================
    # BOX 1: TOP-LEFT (PASTEL CORAL / BLUSH)
    # Professional Trajectory
    # ==========================================
    x1 = margin
    y1 = margin + box_h + gap
    draw_box(x1, y1, P_CORAL_BG, P_CORAL_BORDER, "01")
    
    c.setFillColor(P_CORAL_ACCENT)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(x1 + 14, y1 + box_h - 18, "TRAJECTORY · HPC SYSTEMS")
    c.setFillColor(P_CORAL_TITLE)
    c.setFont("Helvetica-Bold", 11.5)
    c.drawString(x1 + 14, y1 + box_h - 32, "Professional Experience")
    
    # Inner Role 1: BSC Performance Team
    draw_subcard(x1 + 10, y1 + box_h - 116, box_w - 20, 78, 5)
    c.setFillColor(P_CORAL_TITLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x1 + 16, y1 + box_h - 46, "BSC · Performance Team (HPC Software Eng.)")
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(P_CORAL_ACCENT)
    c.drawRightString(x1 + box_w - 16, y1 + box_h - 46, "05/2025 – Present")
    c.setFont("Helvetica", 7.2)
    c.setFillColor(C_TEXT)
    c.drawString(x1 + 16, y1 + box_h - 58, "• Ocean–atmosphere coupling in European digital twin")
    c.drawString(x1 + 16, y1 + box_h - 68, "  flagships: DestinationE and ClimateDT.")
    c.drawString(x1 + 16, y1 + box_h - 78, "• ECLand climate model development with Climate Change team.")
    c.drawString(x1 + 16, y1 + box_h - 88, "• Deploying & monitoring long-running workflows on MN5.")
    c.drawString(x1 + 16, y1 + box_h - 98, "• Scalable multi-node model integration across Tier-0 HPC.")
    
    # Inner Role 2: BSC Fusion Team
    draw_subcard(x1 + 10, y1 + box_h - 198, box_w - 20, 74, 5)
    c.setFillColor(P_CORAL_TITLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x1 + 16, y1 + box_h - 128, "BSC · Fusion Team (Research Engineer)")
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(P_CORAL_ACCENT)
    c.drawRightString(x1 + box_w - 16, y1 + box_h - 128, "05/2023 – 04/2025")
    c.setFont("Helvetica", 7.2)
    c.setFillColor(C_TEXT)
    c.drawString(x1 + 16, y1 + box_h - 140, "• Advanced Computing Hub: parallelization of nuclear fusion")
    c.drawString(x1 + 16, y1 + box_h - 150, "  codes via OpenMP, MPI, PETSc, oneAPI, OpenACC on MN5.")
    c.drawString(x1 + 16, y1 + box_h - 160, "• ALYA-MAGNET: electromagnetic modeling for fusion magnets.")
    c.drawString(x1 + 16, y1 + box_h - 170, "• Cross-disciplinary communication with applied scientists.")
    
    # Inner Role 3: CENER
    draw_subcard(x1 + 10, y1 + box_h - 272, box_w - 20, 66, 5)
    c.setFillColor(P_CORAL_TITLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x1 + 16, y1 + box_h - 210, "CENER · Data Scientist (Analysis & Design)")
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(P_CORAL_ACCENT)
    c.drawRightString(x1 + box_w - 16, y1 + box_h - 210, "05/2022 – 09/2022")
    c.setFont("Helvetica", 7.2)
    c.setFillColor(C_TEXT)
    c.drawString(x1 + 16, y1 + box_h - 222, "• Python pipelines for real-time wind plant characterisation.")
    c.drawString(x1 + 16, y1 + box_h - 232, "• Predictive maintenance & classification (Pandas, Scikit-Learn).")
    c.drawString(x1 + 16, y1 + box_h - 242, "• Bridging data science analytics with operational engineering.")
    
    # Inner Role 4: Univ. Seville & Fraunhofer
    draw_subcard(x1 + 10, y1 + box_h - 348, box_w - 20, 68, 5)
    c.setFillColor(P_CORAL_TITLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x1 + 16, y1 + box_h - 284, "Univ. Seville & Fraunhofer FHR · Researcher")
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(P_CORAL_ACCENT)
    c.drawRightString(x1 + box_w - 16, y1 + box_h - 284, "2018 – 2022")
    c.setFont("Helvetica", 7.2)
    c.setFillColor(C_TEXT)
    c.drawString(x1 + 16, y1 + box_h - 296, "• Theoretical & computational plasma physics (PIC & MHD).")
    c.drawString(x1 + 16, y1 + box_h - 306, "• 3D particle tracking in Python; Fortran magnetic equilibria.")
    c.drawString(x1 + 16, y1 + box_h - 316, "• Lectured Quantum Physics; simulated annealing antenna design.")
    
    # ==========================================
    # BOX 2: TOP-RIGHT (PASTEL MINT / SAGE)
    # Academic Foundation & Technical Matrix
    # ==========================================
    x2 = margin + box_w + gap
    y2 = margin + box_h + gap
    draw_box(x2, y2, P_MINT_BG, P_MINT_BORDER, "02")
    
    c.setFillColor(P_MINT_ACCENT)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(x2 + 14, y2 + box_h - 18, "FOUNDATIONS · COMPUTE STACK")
    c.setFillColor(P_MINT_TITLE)
    c.setFont("Helvetica-Bold", 11.5)
    c.drawString(x2 + 14, y2 + box_h - 32, "Academic Core & Toolkit")
    
    # Education Inset
    draw_subcard(x2 + 10, y2 + box_h - 128, box_w - 20, 90, 5)
    c.setFillColor(P_MINT_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x2 + 16, y2 + box_h - 46, "ACADEMIC EXCELLENCE (Double Degree & MSc):")
    c.setFont("Helvetica", 7.2)
    c.setFillColor(C_TEXT)
    c.drawString(x2 + 16, y2 + box_h - 58, "• BSc Physics & BSc Mathematics (Double Degree)")
    c.setFont("Helvetica-Oblique", 7.0)
    c.drawString(x2 + 24, y2 + box_h - 68, "Univ. of Seville (2013–2018) · Grade: 8.35/10 · 3rd of Class")
    c.setFont("Helvetica", 7.2)
    c.drawString(x2 + 16, y2 + box_h - 80, "• MSc Plasma & Fusion Physics")
    c.setFont("Helvetica-Oblique", 7.0)
    c.drawString(x2 + 24, y2 + box_h - 90, "Univ. Aix-Marseille (2019–2020) · 15.43/20 · 1st of Class")
    c.setFont("Helvetica", 7.2)
    c.drawString(x2 + 16, y2 + box_h - 102, "• MSc Advanced Mathematics")
    c.setFont("Helvetica-Oblique", 7.0)
    c.drawString(x2 + 24, y2 + box_h - 112, "UNED (2023–Present, ABD)")
    
    # Technical Pills Inset
    draw_subcard(x2 + 10, y2 + box_h - 248, box_w - 20, 112, 5)
    c.setFillColor(P_MINT_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x2 + 16, y2 + box_h - 140, "TECHNICAL & HPC COMPUTING STACK:")
    
    c.setFont("Helvetica-Bold", 7.0)
    c.drawString(x2 + 16, y2 + box_h - 152, "Languages & Compilers:")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x2 + 16, y2 + box_h - 162, "Fortran, C++, Python, Bash/Shell, Git, CMake, Slurm.")
    
    c.setFillColor(P_MINT_TITLE)
    c.setFont("Helvetica-Bold", 7.0)
    c.drawString(x2 + 16, y2 + box_h - 176, "Parallel & Accelerator Programming:")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x2 + 16, y2 + box_h - 186, "OpenMP, MPI, PETSc, CUDA, OpenACC, Intel oneAPI.")
    
    c.setFillColor(P_MINT_TITLE)
    c.setFont("Helvetica-Bold", 7.0)
    c.drawString(x2 + 16, y2 + box_h - 200, "Tier-0 Clusters Deployed:")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x2 + 16, y2 + box_h - 210, "MareNostrum 5 (MN5), Leonardo (CINECA), LUMI (CSC).")
    
    c.setFillColor(P_MINT_TITLE)
    c.setFont("Helvetica-Bold", 7.0)
    c.drawString(x2 + 16, y2 + box_h - 224, "Data Science & Machine Learning:")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x2 + 16, y2 + box_h - 234, "NumPy, Pandas, Scikit-Learn, telemetry classification.")
    
    # AI & Languages Inset
    draw_subcard(x2 + 10, y2 + box_h - 348, box_w - 20, 92, 5)
    c.setFillColor(P_MINT_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x2 + 16, y2 + box_h - 260, "AI-ASSISTED DEV & LANGUAGES:")
    
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x2 + 16, y2 + box_h - 272, "• Fluid LLM pair-programming (DeepSeek, Antigravity).")
    c.drawString(x2 + 16, y2 + box_h - 282, "• Fast multi-domain prototyping across firmware & web.")
    c.drawString(x2 + 16, y2 + box_h - 296, "Spoken Languages:")
    c.drawString(x2 + 16, y2 + box_h - 306, "• Spanish (Native), English (C1/Prof.), French (C1/Prof.)")
    c.drawString(x2 + 16, y2 + box_h - 316, "• Italian (Intermediate), German (Intermediate)")
    c.drawString(x2 + 16, y2 + box_h - 330, "Software Engineering Practices:")
    c.drawString(x2 + 16, y2 + box_h - 340, "• Code reviews, technical documentation, agile research.")
    
    # ==========================================
    # BOX 3: BOTTOM-LEFT (PASTEL LAVENDER)
    # The 4 Creative Computing Projects
    # ==========================================
    x3 = margin
    y3 = margin
    draw_box(x3, y3, P_LAVENDER_BG, P_LAVENDER_BORDER, "03")
    
    c.setFillColor(P_LAVENDER_ACCENT)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(x3 + 14, y3 + box_h - 18, "DATA ART & PHYSICAL COMPUTING")
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 11.5)
    c.drawString(x3 + 14, y3 + box_h - 32, "Creative Computing Portfolio")
    
    # Project 1: MNusic
    draw_subcard(x3 + 10, y3 + box_h - 110, box_w - 20, 72, 5)
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x3 + 16, y3 + box_h - 46, "MNusic — Listening to & Visualizing MN5 & LUMI")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x3 + 16, y3 + box_h - 58, "• Sonifies MareNostrum 5 & LUMI telemetry into ambient sound-")
    c.drawString(x3 + 16, y3 + box_h - 68, "  scapes (Web Audio API) & real-time particle wave dynamics.")
    c.drawString(x3 + 16, y3 + box_h - 78, "• Maps power, GPU tensor spikes & cooling thermal gradients.")
    c.drawString(x3 + 16, y3 + box_h - 88, "• Humanizes petascale algorithms for public engagement.")
    c.drawString(x3 + 16, y3 + box_h - 98, "• Stack: HPC Telemetry, Web Audio, HTML5 Canvas, LLM dev.")
    
    # Project 2: Pipa-Music-Ball
    draw_subcard(x3 + 10, y3 + box_h - 188, box_w - 20, 72, 5)
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x3 + 16, y3 + box_h - 124, "Pipa-Music-Ball — Bio-Kinetic Interactive Sound")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x3 + 16, y3 + box_h - 136, "• Embedded physical sphere powered by ESP32 and 6-DoF")
    c.drawString(x3 + 16, y3 + box_h - 146, "  inertial sensor (IMU accelerometer & gyroscope).")
    c.drawString(x3 + 16, y3 + box_h - 156, "• Translates feline kinetic motion into microtonal musical phrasing.")
    c.drawString(x3 + 16, y3 + box_h - 166, "• Non-anthropocentric tangible physical data storytelling.")
    c.drawString(x3 + 16, y3 + box_h - 176, "• Stack: ESP32/Arduino, I2S DAC, gesture-to-tone mapping.")
    
    # Project 3: Expo-Curator
    draw_subcard(x3 + 10, y3 + box_h - 268, box_w - 20, 72, 5)
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x3 + 16, y3 + box_h - 202, "Expo-Curator — github.com/carrommad/expo-curator")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x3 + 16, y3 + box_h - 214, "• Automated image classification, catalog booklet publishing,")
    c.drawString(x3 + 16, y3 + box_h - 224, "  and modular gallery wall staging application.")
    c.drawString(x3 + 16, y3 + box_h - 234, "• Built to organize complex visual collections into spatial stories.")
    c.drawString(x3 + 16, y3 + box_h - 244, "• Directly serves exhibition design for museums & science centers.")
    c.drawString(x3 + 16, y3 + box_h - 254, "• Stack: JavaScript, Python, spatial layout geometry.")
    
    # Project 4: Lens & Motion
    draw_subcard(x3 + 10, y3 + box_h - 348, box_w - 20, 72, 5)
    c.setFillColor(P_LAVENDER_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x3 + 16, y3 + box_h - 282, "Lens & Motion — Photography & Adobe After Effects")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x3 + 16, y3 + box_h - 294, "• Architectural still photography (framing, geometric light)")
    c.drawString(x3 + 16, y3 + box_h - 304, "  paired with procedural After Effects motion design.")
    c.drawString(x3 + 16, y3 + box_h - 314, "• Kinetic typography & procedural particle simulation.")
    c.drawString(x3 + 16, y3 + box_h - 324, "• Converts static scientific data plots into broadcast visual essays.")
    c.drawString(x3 + 16, y3 + box_h - 334, "• Stack: Adobe After Effects, color grading, visual rhythm.")
    
    # ==========================================
    # BOX 4: BOTTOM-RIGHT (PASTEL SKY BLUE)
    # Direct DAV Synergy & Fernando Cucchietti
    # ==========================================
    x4 = margin + box_w + gap
    y4 = margin
    draw_box(x4, y4, P_SKY_BG, P_SKY_BORDER, "04")
    
    c.setFillColor(P_SKY_ACCENT)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(x4 + 14, y4 + box_h - 18, "DAV GROUP · FERNANDO CUCCHIETTI")
    c.setFillColor(P_SKY_TITLE)
    c.setFont("Helvetica-Bold", 11.5)
    c.drawString(x4 + 14, y4 + box_h - 32, "Synergy with Research Lines")
    
    # Line 1
    draw_subcard(x4 + 10, y4 + box_h - 104, box_w - 20, 66, 5)
    c.setFillColor(P_SKY_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x4 + 16, y4 + box_h - 46, "1. Scientific Visualization & Storytelling:")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x4 + 16, y4 + box_h - 58, "• Turning extreme-scale physics into visceral public narratives.")
    c.drawString(x4 + 16, y4 + box_h - 68, "• Direct match: MNusic (audible MN5) and After Effects motion.")
    c.drawString(x4 + 16, y4 + box_h - 78, "• Democratization of science for museums, festivals & workshops.")
    c.drawString(x4 + 16, y4 + box_h - 88, "• Domestic Data Streamers inspired tactile participatory design.")
    
    # Line 2
    draw_subcard(x4 + 10, y4 + box_h - 176, box_w - 20, 66, 5)
    c.setFillColor(P_SKY_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x4 + 16, y4 + box_h - 118, "2. Industrial AI & Digital Twins (GDU-HPC):")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x4 + 16, y4 + box_h - 130, "• Direct synergy with BSC DestinationE & ClimateDT digital twins.")
    c.drawString(x4 + 16, y4 + box_h - 140, "• Scalable model integration on MareNostrum 5 & cloud workflows.")
    c.drawString(x4 + 16, y4 + box_h - 150, "• Predictive ML & classification pipelines from CENER wind plants.")
    c.drawString(x4 + 16, y4 + box_h - 160, "• Applied to urban analytics and industrial multi-physics.")
    
    # Line 3
    draw_subcard(x4 + 10, y4 + box_h - 248, box_w - 20, 66, 5)
    c.setFillColor(P_SKY_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x4 + 16, y4 + box_h - 190, "3. Creative Intelligence & Interactive Viz:")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x4 + 16, y4 + box_h - 202, "• Bio-kinetic hardware (Pipa-music-ball) & ESP32 sensors.")
    c.drawString(x4 + 16, y4 + box_h - 212, "• Exhibition curation & automated sub-classification (Expo-Curator).")
    c.drawString(x4 + 16, y4 + box_h - 222, "• Participatory spatial experiments & real-time visitor streams.")
    c.drawString(x4 + 16, y4 + box_h - 232, "• AI-augmented rapid prototyping across disciplines.")
    
    # Line 4
    draw_subcard(x4 + 10, y4 + box_h - 320, box_w - 20, 66, 5)
    c.setFillColor(P_SKY_TITLE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x4 + 16, y4 + box_h - 262, "4. Urban Data Science (AIR & REALLOCATE):")
    c.setFont("Helvetica", 7.0)
    c.setFillColor(C_TEXT)
    c.drawString(x4 + 16, y4 + box_h - 274, "• Physics grounding: fluid dynamics, plasma transport & wind.")
    c.drawString(x4 + 16, y4 + box_h - 284, "• AIR: Environmental air resilience as meeting & expressive space.")
    c.drawString(x4 + 16, y4 + box_h - 294, "• REALLOCATE: Data design for climate-friendly active mobility.")
    c.drawString(x4 + 16, y4 + box_h - 304, "• Bridging mathematical solvers with actionable public tools.")
    
    # Footer Statement Bar (Inside Box 04)
    c.setStrokeColor(colors.HexColor("#cbe6fa"))
    c.setLineWidth(0.8)
    c.line(x4 + 10, y4 + 18, x4 + box_w - 10, y4 + 18)
    c.setFillColor(P_SKY_TITLE)
    c.setFont("Helvetica-Bold", 6.8)
    c.drawString(x4 + 12, y4 + 7, "Democratizing Science · Art · Extreme Compute")
    c.setFont("Helvetica", 6.8)
    c.setFillColor(colors.HexColor("#64748b"))
    c.drawRightString(x4 + box_w - 12, y4 + 7, "Carlos Romero · BSC 2026")
    
    c.showPage()
    c.save()
    print("Pastel Boxes CV PDF generated:", pdf_filename)

if __name__ == "__main__":
    generate_pastel_boxes_cv()
