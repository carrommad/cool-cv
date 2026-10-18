import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_cover_letter():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pdf_filename = os.path.join(base_dir, "Carlos_Romero_Cover_Letter.pdf")
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=34,
        bottomMargin=34
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Palette
    C_PRIMARY = colors.HexColor("#0f172a")
    C_ACCENT = colors.HexColor("#6366f1")
    C_SECONDARY = colors.HexColor("#475569")
    C_TEXT = colors.HexColor("#1e293b")
    
    name_style = ParagraphStyle(
        'CoverName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=C_PRIMARY
    )
    
    sub_style = ParagraphStyle(
        'CoverSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=C_ACCENT
    )
    
    meta_style = ParagraphStyle(
        'CoverMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        alignment=2, # Right align
        textColor=C_SECONDARY
    )
    
    to_style = ParagraphStyle(
        'CoverTo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=C_TEXT
    )
    
    subject_style = ParagraphStyle(
        'CoverSubject',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=C_PRIMARY
    )
    
    body_style = ParagraphStyle(
        'CoverBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.8,
        leading=14.5,
        textColor=C_TEXT,
        alignment=4 # Justify
    )
    
    bullet_style = ParagraphStyle(
        'CoverBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=C_TEXT,
        leftIndent=14
    )
    
    story = []
    
    # Header Table
    header_data = [
        [
            Paragraph("<b>Carlos Romero Madrid</b><br/><font color='#6366f1' size=9><b>Computational Physicist • HPC Software Engineer • Creative Technologist</b></font>", name_style),
            Paragraph("<b>carrommad@gmail.com</b><br/>+34 611 423 133 • Barcelona<br/><font color='#6366f1'><b><link href=\"https://carrommad.github.io/cool-cv/\">🌐 carrommad.github.io/cool-cv</link></b></font><br/>October 2026", meta_style)
        ]
    ]
    t = Table(header_data, colWidths=[310, 200])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t)
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT, spaceBefore=2, spaceAfter=8))
    
    # Recipient
    story.append(Paragraph("<b>To: The Selection Committee & Group Lead</b><br/>Data Analytics and Visualization Group<br/>Barcelona Supercomputing Center (BSC-CNS)", to_style))
    story.append(Spacer(1, 8))
    
    # Subject
    story.append(Paragraph("<b>Subject: Application to join the Data Analytics and Visualization Group</b>", subject_style))
    story.append(Spacer(1, 7))
    
    # Body Paragraphs
    story.append(Paragraph(
        "Dear Members of the Data Analytics and Visualization Group,", body_style
    ))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph(
        "Most resumes begin with a dense list of buzzwords. Let me begin with a sound: the hum of <b>MareNostrum 5</b> computing climate turbulence, or the chime of a motion-sensing sphere when my cat <b>Pipa</b> knocks it across the floor.",
        body_style
    ))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph(
        "As a <b>Computational Physicist</b> (Double Degree Physics & Mathematics, 1st of Class MSc Plasma Physics) and <b>HPC Scientific Software Engineer</b> at BSC, I spend my days parallelizing solvers on Tier-0 supercomputers (MN5, Leonardo, LUMI). Yet my honest conviction is simple: <i>if petabytes of scientific discoveries remain locked behind cold terminal logs and abstract matrices, we have only completed half the mission.</i>",
        body_style
    ))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph(
        "Inspired by <b>Domestic Data Streamers</b>, I treat data as raw physical matter to be touched, heard, and questioned. In my personal studio, I turn this into playful and rigorous reality:",
        body_style
    ))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph(
        "• <b>MNusic (Sonifying & Visualizing MareNostrum 5 & LUMI):</b> Synaesthetic telemetry engine mapping cluster load, memory pipelines, and thermal gradients into real-time harmonic soundscapes (Web Audio API) and generative particles, letting audiences hear Europe's supercomputing heartbeat.",
        bullet_style
    ))
    story.append(Spacer(1, 3))
    
    story.append(Paragraph(
        "• <b>Pipa-Music-Ball (Bio-Kinetic Physical Computing):</b> Embedded interactive sphere (ESP32, 6-DoF IMU) translating feline kinetic play into microtonal scales. Proof that physical data interfaces can be both scientifically grounded and feline-approved.",
        bullet_style
    ))
    story.append(Spacer(1, 3))
    
    story.append(Paragraph(
        "• <b>Expo-Curator (Exhibition & Booklet Design Studio):</b> An open-source application for automated image sub-classification, catalog booklet design, and exhibition wall staging.",
        bullet_style
    ))
    story.append(Spacer(1, 3))
    
    story.append(Paragraph(
        "• <b>After Effects Lab (Procedural Motion Design):</b> Still photographic composition paired with motion graphics, procedural particle animations, and kinetic video in After Effects to turn static research figures into broadcast-ready visual essays.",
        bullet_style
    ))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph(
        "I build at lightning speed: pairing with Large Language Models allows me to fluidly bridge C++/Fortran HPC kernels, microcontroller firmware, browser audio synthesis, and visual motion graphics.",
        body_style
    ))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph(
        "Following your workshops and tracking your flagship initiatives—such as the urban digital twin modeling of <b>GDU-HPC</b>, the atmospheric narratives of <b>AIR</b>, and climate mobility in <b>REALLOCATE</b>—I see an organic match with my digital twin work at BSC (DestinationE / ClimateDT) and my creative installations. I would be thrilled to join Fernando Cucchietti and the team to co-design the next generation of daring, unforgettable scientific data experiences.",
        body_style
    ))
    story.append(Spacer(1, 4))

    # Live Interactive Web Dossier Invitation Box
    callout_data = [
        [
            Paragraph("<font color='#4338ca'><b>🌐 Live Interactive Portfolio & Sound Installation:</b></font> <font color='#1e293b'>I have built an interactive web version of this application featuring real-time MareNostrum 5 telemetry sonification, day/night audio crossfader, and video cinema mode at </font><font color='#4f46e5'><b><link href=\"https://carrommad.github.io/cool-cv/\"><u>https://carrommad.github.io/cool-cv</u></link></b></font>", body_style)
        ]
    ]
    callout_t = Table(callout_data, colWidths=[510])
    callout_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(callout_t)
    story.append(Spacer(1, 6))

    story.append(Paragraph(
        "Thank you for your time, consideration, and inspiration. I look forward to meeting and brainstorming upcoming projects.",
        body_style
    ))
    story.append(Spacer(1, 6))
    
    # Signoff
    story.append(Paragraph("Warm regards,<br/><br/><b>Carlos Romero Madrid</b><br/><font color='#64748b' size=8.5>Computational Physicist · HPC Scientific Software Engineer (BSC)<br/>carrommad@gmail.com · carlos.romero@bsc.es · +34 611 423 133 · <font color='#6366f1'><link href=\"https://carrommad.github.io/cool-cv/\"><b>carrommad.github.io/cool-cv</b></link></font></font>", to_style))
    
    doc.build(story)
    print("Cover letter generated:", pdf_filename)

if __name__ == "__main__":
    generate_cover_letter()
