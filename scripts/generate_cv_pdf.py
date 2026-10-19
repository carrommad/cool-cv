import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_cv_pdf():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pdf_filename = os.path.join(base_dir, "Carlos_Romero_CV.pdf")
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=34,
        bottomMargin=32
    )
    
    styles = getSampleStyleSheet()
    
    # Palette
    C_PRIMARY = colors.HexColor("#0f172a")     # Deep Slate
    C_ACCENT = colors.HexColor("#4f46e5")      # Electric Indigo
    C_CORAL = colors.HexColor("#db2777")       # Vibrant Rose
    C_CYAN = colors.HexColor("#0284c7")        # Vivid Sky
    C_TEXT = colors.HexColor("#1e293b")
    C_MUTED = colors.HexColor("#64748b")
    C_CARD_BG = colors.HexColor("#f8fafc")
    C_BORDER = colors.HexColor("#e2e8f0")
    
    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=21,
        leading=25,
        textColor=C_PRIMARY
    )
    
    meta_style = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.6,
        leading=12.5,
        alignment=2,
        textColor=C_MUTED
    )
    
    section_h_style = ParagraphStyle(
        'SectionH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=C_PRIMARY,
        spaceBefore=10,
        spaceAfter=4
    )
    
    summary_style = ParagraphStyle(
        'Summary',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.0,
        leading=13.6,
        textColor=C_TEXT
    )
    
    proj_title_style = ParagraphStyle(
        'ProjTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=C_PRIMARY
    )
    
    body_style = ParagraphStyle(
        'BodyP',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.6,
        leading=12.6,
        textColor=C_TEXT
    )

    callout_style = ParagraphStyle(
        'CalloutP',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.6,
        leading=12.5,
        textColor=C_TEXT
    )
    
    story = []
    
    # 1. Header Banner
    header_data = [
        [
            Paragraph("<b>Carlos Romero Madrid</b><br/><font color='#4f46e5' size=9.2><b>Scientific Software Engineer • Computational Physicist • Creative Computing</b></font>", title_style),
            Paragraph("<b>carrommad@gmail.com</b> • +34 611 423 133<br/>carlos.romero@bsc.es • Barcelona, Spain<br/><font color='#4f46e5'><b><link href=\"https://carrommad.github.io/cool-cv/\">🌐 carrommad.github.io/cool-cv</link></b></font> • <link href=\"https://linkedin.com/in/carrommad\">linkedin.com/in/carrommad</link>", meta_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[325, 198])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT, spaceBefore=2, spaceAfter=8))
    
    # 2. Executive Statement
    summary_p = Paragraph(
        "<b>Profile & Mission:</b> Computational Physicist (Double Degree Physics & Mathematics, 1st of Class MSc Plasma Physics) and HPC Software Engineer at BSC with 5+ years experience. Bridging extreme-scale HPC clusters (MN5, Leonardo, LUMI) with physical computing, generative sound, and narrative data visualization for the <b>democratization of science</b>. Pairing with LLMs for high-velocity cross-disciplinary prototyping.",
        summary_style
    )
    story.append(summary_p)
    story.append(Spacer(1, 6))
    
    # 3. Featured Creative Computing Projects (2x2 Grid)
    story.append(Paragraph("<b>Featured Creative Computing & Data Projects</b>", section_h_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=C_BORDER, spaceBefore=2, spaceAfter=6))
    
    p1 = (
        "<b>MNusic — Supercomputer Sonification</b><br/>"
        "<font size=7.2 color='#db2777'><b>HPC TELEMETRY & AUDIO</b></font> • "
        "<font size=7.2 color='#4f46e5'><b><link href=\"https://carrommad.github.io/cool-cv/\">WEB APP ↗</link></b></font><br/>"
        "Translates tier-0 cluster metrics (MN5, LUMI) into real-time harmonic soundscapes (Web Audio API) and dynamic particle visuals, humanizing petascale computation."
    )
    p2 = (
        "<b>Pipa-Music-Ball — Bio-Kinetic Sound</b><br/>"
        "<font size=7.2 color='#db2777'><b>PHYSICAL IOT & SENSORS</b></font> • "
        "<font size=7.2 color='#4f46e5'><b><link href=\"https://github.com/carrommad/pipa-music-ball\">GITHUB ↗</link></b></font><br/>"
        "Embedded microcontroller sphere (ESP32, 6-DoF IMU) translating feline kinetic play into generative microtonal acoustic phrases—tangible and playful data embodiment."
    )
    p3 = (
        "<b>Expo-Curator — Visual Corpus Analytics</b><br/>"
        "<font size=7.2 color='#db2777'><b>CURATION STUDIO & STAGING</b></font> • "
        "<font size=7.2 color='#4f46e5'><b><link href=\"https://github.com/carrommad/expo\">GITHUB ↗</link></b></font><br/>"
        "Open-source studio application for automated image sub-classification, booklet design, and exhibition wall staging for cultural and science dissemination spaces."
    )
    p4 = (
        "<b>After Effects Lab — Procedural Motion</b><br/>"
        "<font size=7.2 color='#db2777'><b>MOTION DESIGN & VIDEO</b></font> • "
        "<font size=7.2 color='#4f46e5'><b><link href=\"https://carrommad.github.io/cool-cv/\">CINEMA REEL ↗</link></b></font><br/>"
        "Still photographic composition combined with procedural Adobe After Effects motion graphics to turn static scientific research into broadcast-ready visual essays."
    )
    
    grid_data = [
        [Paragraph(p1, body_style), Paragraph(p2, body_style)],
        [Paragraph(p3, body_style), Paragraph(p4, body_style)]
    ]
    grid_table = Table(grid_data, colWidths=[258, 258])
    grid_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, C_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.4, C_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(grid_table)
    story.append(Spacer(1, 6))
    
    # 4. Technical Capabilities Matrix (3 Columns)
    story.append(Paragraph("<b>Technical Matrix & Creative Capabilities</b>", section_h_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=C_BORDER, spaceBefore=2, spaceAfter=6))
    
    skills_data = [
        [
            Paragraph("<b>Creative Computing & Audio</b><br/>• Tangible Data Interfaces (ESP32/IMU)<br/>• Web Audio API Real-Time Synthesis<br/>• HTML5 Canvas & Generative Systems<br/>• Inspired by Domestic Data Streamers", body_style),
            Paragraph("<b>Visual Media & Motion Design</b><br/>• <b>Adobe After Effects</b> (Motion Graphics)<br/>• <b>Still Photography</b> & Spatial Framing<br/>• <b>Expo-Curator</b> Exhibition Studio<br/>• Kinetic Typography & Color Grading", body_style),
            Paragraph("<b>HPC, AI & Compute Systems</b><br/>• <b>Tier-0 Supercomputers</b> (MN5, LUMI, Slurm)<br/>• <b>Computer Vision & MediaPipe</b><br/>• Parallel C++, Fortran, OpenMP/MPI/CUDA<br/>• <b>Agentic LLM Pipelines & Web ML</b>", body_style)
        ]
    ]
    skills_table = Table(skills_data, colWidths=[174, 175, 174])
    skills_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, C_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.4, C_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 6))
    
    # 5. Trajectory & Academic Foundation
    story.append(Paragraph("<b>Professional Trajectory & Academic Foundation</b>", section_h_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=C_BORDER, spaceBefore=2, spaceAfter=6))
    
    traj_data = [
        [
            Paragraph("<b>Barcelona Supercomputing Center (BSC-CNS) — HPC Scientific Software Engineer</b>", proj_title_style),
            Paragraph("May 2023 — Present", meta_style)
        ],
        [
            Paragraph("• <i>Performance Team (May 2025–Present):</i> DestinationE & ClimateDT digital twins on MareNostrum 5; developing ECLand.<br/>• <i>Fusion Team (May 2023–Apr 2025):</i> Optimized nuclear fusion simulation codes with OpenMP/MPI/CUDA; ALYA-MAGNET modeling.", body_style),
            ""
        ],
        [
            Paragraph("<b>National Renewable Energy Centre (CENER) — Data Scientist</b>", proj_title_style),
            Paragraph("May 2022 — Sep 2022", meta_style)
        ],
        [
            Paragraph("• Built Python real-time telemetry data pipelines for characterisation and predictive maintenance of offshore wind plants.", body_style),
            ""
        ],
        [
            Paragraph("<b>Univ. of Seville (Research Scientist) & Fraunhofer FHR (Cognitive Radar)</b>", proj_title_style),
            Paragraph("2018 — 2022", meta_style)
        ],
        [
            Paragraph("• Particle-in-cell & MHD plasma simulations on HPC clusters; lectured Quantum Physics; non-planar radar antenna optimization.", body_style),
            ""
        ],
        [
            Paragraph("<b>Academic Rigor: Double BSc Physics & Mathematics • MSc Plasma (1st) • MSc Adv. Maths</b>", proj_title_style),
            Paragraph("Univ. Seville • Marseille • UNED", meta_style)
        ],
        [
            Paragraph("• <b>Double BSc in Physics & Mathematics</b> (Univ. Seville, 2013-18, <b>3rd of Class</b>); <b>MSc Plasma & Fusion Physics</b> (Aix-Marseille, 2019-20, <b>1st of Class</b>, 15.43); MSc Advanced Mathematics (UNED, 2023-Present).", body_style),
            ""
        ]
    ]
    traj_table = Table(traj_data, colWidths=[395, 128])
    traj_table.setStyle(TableStyle([
        ('SPAN', (0,1), (1,1)),
        ('SPAN', (0,3), (1,3)),
        ('SPAN', (0,5), (1,5)),
        ('SPAN', (0,7), (1,7)),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(traj_table)
    story.append(Spacer(1, 8))

    # 6. Live Interactive Portfolio Invitation Box
    callout_html = (
        "<font color='#4338ca'><b>🌐 Live Interactive Portfolio & Telemetry Synthesizer:</b></font> "
        "Experience real-time MareNostrum 5 soundscapes, ambient crossfader, and video cinema mode at: "
        "<font color='#4f46e5'><b><link href=\"https://carrommad.github.io/cool-cv/\"><u>https://carrommad.github.io/cool-cv</u></link></b></font>"
    )
    callout_t = Table([[Paragraph(callout_html, callout_style)]], colWidths=[523])
    callout_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(callout_t)
    
    doc.build(story)
    print("CV generated:", pdf_filename)

if __name__ == "__main__":
    generate_cv_pdf()
