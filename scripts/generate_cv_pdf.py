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
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Palette
    C_PRIMARY = colors.HexColor("#0f172a")     # Deep Slate
    C_ACCENT = colors.HexColor("#6366f1")      # Electric Indigo
    C_CORAL = colors.HexColor("#ec4899")       # Neon Pink/Coral
    C_CYAN = colors.HexColor("#0891b2")        # Vivid Cyan
    C_TEXT = colors.HexColor("#1e293b")
    C_MUTED = colors.HexColor("#64748b")
    C_CARD_BG = colors.HexColor("#f8fafc")
    C_BORDER = colors.HexColor("#e2e8f0")
    
    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=C_PRIMARY
    )
    
    tagline_style = ParagraphStyle(
        'Tagline',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=C_ACCENT
    )
    
    meta_style = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
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
        spaceBefore=8,
        spaceAfter=4
    )
    
    summary_style = ParagraphStyle(
        'Summary',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=13.5,
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
    
    proj_tag_style = ParagraphStyle(
        'ProjTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=C_CORAL
    )
    
    body_style = ParagraphStyle(
        'BodyP',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.3,
        leading=12.2,
        textColor=C_TEXT
    )
    
    body_muted = ParagraphStyle(
        'BodyMuted',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=11,
        textColor=C_MUTED
    )
    
    story = []
    
    # 1. Header Banner
    header_data = [
        [
            Paragraph("<b>Carlos Romero Madrid</b><br/><font color='#6366f1' size=9><b>Computational Physicist • HPC Software Engineer • Creative Technologist</b></font>", title_style),
            Paragraph("<b>carrommad@gmail.com</b> • carlos.romero@bsc.es<br/>+34 611 423 133 • Barcelona, Spain<br/>linkedin.com/in/carrommad", meta_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[330, 193])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT, spaceBefore=3, spaceAfter=6))
    
    # 2. Executive Statement
    summary_p = Paragraph(
        "<b>Profile & Mission:</b> Computational Physicist (Double Degree Physics & Mathematics, 1st of Class MSc Plasma Physics) and HPC Software Engineer at BSC with 5+ years experience. Bridging extreme-scale HPC clusters (MN5, Leonardo, LUMI) with physical computing, generative sound, and narrative data visualization for the <b>democratization of science</b>. Actively pairing with LLMs for high-velocity cross-disciplinary prototyping.",
        summary_style
    )
    story.append(summary_p)
    story.append(Spacer(1, 5))
    
    # 3. Highlights Strip
    hl_data = [
        [
            Paragraph("<b>BSC HPC Engineer</b><br/><font size=7.2 color='#64748b'>MN5, ClimateDT & DestinationE</font>", body_style),
            Paragraph("<b>Physics & Mathematics</b><br/><font size=7.2 color='#64748b'>Double Degree & Plasma MSc (1st)</font>", body_style),
            Paragraph("<b>Physical Computing</b><br/><font size=7.2 color='#64748b'>ESP32, 6-DoF IMU & I2S Sonification</font>", body_style),
            Paragraph("<b>Visual Storytelling</b><br/><font size=7.2 color='#64748b'>Expo-Curator, Photo & After Effects</font>", body_style),
        ]
    ]
    hl_table = Table(hl_data, colWidths=[130, 130, 130, 133])
    hl_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, C_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(hl_table)
    story.append(Spacer(1, 6))
    
    # 4. Featured Creative Projects
    story.append(Paragraph("<b>Featured Creative Computing & Data Projects</b>", section_h_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=C_BORDER, spaceBefore=2, spaceAfter=5))
    
    projs_content = [
        [
            Paragraph("<b>MNusic — Visualizing & Listening to MareNostrum 5 & LUMI</b>", proj_title_style),
            Paragraph("HPC DATA SONIFICATION", proj_tag_style)
        ],
        [
            Paragraph("• Synaesthetic telemetry engine translating tier-0 supercomputing metrics into real-time harmonic soundscapes (Web Audio API) and generative dynamic particle visuals.<br/>• Maps compute utilization, GPU tensor spikes, interconnect latency, and cooling thermal gradients into microtonal frequencies and acoustic harmonics, humanizing petascale computation.", body_style),
            ""
        ],
        [
            Paragraph("<b>Pipa-Music-Ball — Non-Human Bio-Kinetic Interactive Sound System</b>", proj_title_style),
            Paragraph("PHYSICAL COMPUTING & SENSORY IOT", proj_tag_style)
        ],
        [
            Paragraph("• Embedded microcontroller-powered physical sphere translating feline kinetic play (velocity, tilt, angular acceleration) into generative microtonal acoustic phrases.<br/>• Places animal curiosity at the heart of the generative loop; tangible proof that data interfaces can be playful, tactile, and non-anthropocentric (ESP32, 6-DoF IMU, I2S DAC).", body_style),
            ""
        ],
        [
            Paragraph("<b>Expo-Curator — Visual Corpus Analytics & Exhibition Staging</b>", proj_title_style),
            Paragraph("CORPUS ANALYTICS • GITHUB", proj_tag_style)
        ],
        [
            Paragraph("• Open-source studio application for image curation, automated sub-classification, booklet design, and exhibition wall staging.<br/>• Streamlines spatial narrative organization and print-ready editorial catalogs for cultural spaces, science centers, and multidisciplinary exhibitions.", body_style),
            ""
        ],
        [
            Paragraph("<b>After Effects Lab — Procedural Motion Design & Kinetic Animation</b>", proj_title_style),
            Paragraph("VISUAL MEDIA & MOTION DESIGN", proj_tag_style)
        ],
        [
            Paragraph("• Creative investigation combining still photographic framing, spatial composition, and lighting with procedural Adobe After Effects motion graphics.<br/>• Translates abstract scientific telemetry into broadcast-quality cinematic videos, kinetic typography, and exhibition reels.", body_style),
            ""
        ]
    ]
    p_table = Table(projs_content, colWidths=[395, 128])
    p_table.setStyle(TableStyle([
        ('SPAN', (0,1), (1,1)),
        ('SPAN', (0,3), (1,3)),
        ('SPAN', (0,5), (1,5)),
        ('SPAN', (0,7), (1,7)),
        ('BACKGROUND', (0,0), (-1,-1), C_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, C_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.3, C_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(p_table)
    story.append(Spacer(1, 6))
    
    # 5. Skills & Toolkit Matrix (3 Columns)
    story.append(Paragraph("<b>Technical Matrix & Creative Capabilities</b>", section_h_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=C_BORDER, spaceBefore=2, spaceAfter=5))
    
    skills_data = [
        [
            Paragraph("<b>Data Art & Visualization</b><br/>• Tangible Data Interfaces<br/>• Web Audio API Sonification<br/>• HTML5 Canvas & Generative Art<br/>• Narrative Architecture & Infographics<br/>• Inspired by Domestic Data Streamers", body_style),
            Paragraph("<b>Motion & Visual Media</b><br/>• <b>Adobe After Effects</b> (Motion/AE)<br/>• <b>Still Photography</b> & Framing<br/>• <b>Expo-Curator</b> Exhibition Studio<br/>• Video Rhythm & Kinetic Typography<br/>• Color Grading & Visual Systems", body_style),
            Paragraph("<b>AI, Vision & Physical Computing</b><br/>• <b>Computer Vision & MediaPipe</b><br/>• PyTorch, Embeddings & Latent Space<br/>• Physical Computing (ESP32, 6-DoF IMU)<br/>• CUDA GPU & Slurm Cluster Scaling<br/>• <b>Agentic LLM Pipelines & Web ML</b>", body_style)
        ]
    ]
    skills_table = Table(skills_data, colWidths=[174, 174, 175])
    skills_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, C_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 6))
    
    # 6. Trajectory & Experience
    story.append(Paragraph("<b>Professional Trajectory & Academic Foundation</b>", section_h_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=C_BORDER, spaceBefore=2, spaceAfter=5))
    
    traj_data = [
        [
            Paragraph("<b>Barcelona Supercomputing Center (BSC-CNS) — HPC Scientific Software Engineer</b>", proj_title_style),
            Paragraph("May 2023 — Present", meta_style)
        ],
        [
            Paragraph("• <i>Performance Team (May 2025 – Present):</i> Ocean-atmosphere coupling in DestinationE & ClimateDT digital twins; developing ECLand model; deploying workflows on MareNostrum 5.<br/>• <i>Fusion Team (May 2023 – Apr 2025):</i> Optimized nuclear fusion simulation codes with OpenMP/MPI/CUDA/OpenACC; implemented superconducting magnet modeling in ALYA-MAGNET.", body_style),
            ""
        ],
        [
            Paragraph("<b>National Renewable Energy Centre (CENER) — Data Scientist</b>", proj_title_style),
            Paragraph("May 2022 — Sep 2022", meta_style)
        ],
        [
            Paragraph("• Built Python real-time telemetry data pipelines for characterisation and predictive maintenance of offshore wind plants using Pandas and Scikit-Learn.", body_style),
            ""
        ],
        [
            Paragraph("<b>Univ. of Seville (Research Scientist) & Fraunhofer FHR (Cognitive Radar)</b>", proj_title_style),
            Paragraph("2018 — 2022", meta_style)
        ],
        [
            Paragraph("• Particle-in-cell (PIC) & MHD plasma simulations on HPC systems; lectured Quantum Physics; MATLAB simulated annealing optimization for non-planar radar antenna design.", body_style),
            ""
        ],
        [
            Paragraph("<b>Education: Double BSc Physics & Mathematics (8.35 · 3rd) • MSc Plasma (15.43 · 1st)</b>", proj_title_style),
            Paragraph("Univ. Seville • Aix-Marseille • UNED", meta_style)
        ],
        [
            Paragraph("• Double BSc in Physics & Mathematics (Univ. of Seville, 2013-2018); MSc Plasma & Fusion Physics (Aix-Marseille Univ., 2019-2020); MSc Advanced Mathematics (UNED, 2023-Present, ABD).", body_style),
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
    
    doc.build(story)
    print("CV generated:", pdf_filename)

if __name__ == "__main__":
    generate_cv_pdf()
