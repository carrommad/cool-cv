import os
import json
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_cover_letter():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pdf_filename = os.path.join(base_dir, "Carlos_Romero_Cover_Letter.pdf")
    json_path = os.path.join(base_dir, "cover_letter.json")

    # Load from cover_letter.json if available
    data = {}
    if os.path.exists(json_path):
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            print(f"Warning: Could not read cover_letter.json: {e}")

    recipient = data.get("recipient", {
        "to": "The Selection Committee & Group Lead",
        "group": "Data Analytics and Visualization Group (DAV)",
        "institution": "Barcelona Supercomputing Center (BSC-CNS)"
    })
    subject_text = data.get("subject", "Application to join the Data Analytics and Visualization Group")
    opening = data.get("opening", "Dear Members of the Data Analytics and Visualization Group,")
    paragraphs = data.get("paragraphs", [])
    projects = data.get("projects", [])
    closing_paragraphs = data.get("closing_paragraphs", [])
    invitation = data.get("invitation_box", {
        "title": "Live Interactive Portfolio & Sound Installation",
        "text": "Explore real-time MN5 telemetry sonification, day/night audio crossfader, and video cinema mode at:",
        "url": "https://carrommad.github.io/cool-cv/",
        "url_display": "carrommad.github.io/cool-cv"
    })
    signoff = data.get("signoff", {
        "greeting": "Warm regards,",
        "name": "Carlos Romero Madrid",
        "title": "Computational Physicist · HPC Scientific Software Engineer (BSC)",
        "contact": "carrommad@gmail.com · carlos.romero@bsc.es · +34 611 423 133",
        "web_url": "https://carrommad.github.io/cool-cv/"
    })

    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        rightMargin=38,
        leftMargin=38,
        topMargin=32,
        bottomMargin=30
    )
    
    styles = getSampleStyleSheet()
    
    # Palette
    C_PRIMARY = colors.HexColor("#0f172a")
    C_ACCENT = colors.HexColor("#4f46e5")
    C_SECONDARY = colors.HexColor("#475569")
    C_TEXT = colors.HexColor("#1e293b")
    
    name_style = ParagraphStyle(
        'CoverName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=21,
        leading=25,
        textColor=C_PRIMARY
    )
    
    meta_style = ParagraphStyle(
        'CoverMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.2,
        alignment=2,
        textColor=C_SECONDARY
    )
    
    to_style = ParagraphStyle(
        'CoverTo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.2,
        leading=13.2,
        textColor=C_TEXT
    )
    
    subject_style = ParagraphStyle(
        'CoverSubject',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14.5,
        textColor=C_PRIMARY
    )
    
    body_style = ParagraphStyle(
        'CoverBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.2,
        leading=13.6,
        textColor=C_TEXT,
        alignment=4 # Justified
    )
    
    bullet_style = ParagraphStyle(
        'CoverBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.0,
        leading=13.2,
        textColor=C_TEXT,
        leftIndent=12
    )

    callout_style = ParagraphStyle(
        'CoverCallout',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.6,
        leading=12.6,
        textColor=C_TEXT
    )
    
    story = []
    
    # Header Table
    header_data = [
        [
            Paragraph("<b>Carlos Romero Madrid</b><br/><font color='#4f46e5' size=8.8><b>Computational Physicist • HPC Software Engineer • Creative Technologist</b></font>", name_style),
            Paragraph(f"<b>carrommad@gmail.com</b><br/>+34 611 423 133 • Barcelona<br/><font color='#4f46e5'><b><link href='{invitation.get('url', 'https://carrommad.github.io/cool-cv/')}'>🌐 {invitation.get('url_display', 'carrommad.github.io/cool-cv')}</link></b></font><br/>October 2026", meta_style)
        ]
    ]
    t = Table(header_data, colWidths=[315, 204])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t)
    story.append(Spacer(1, 5))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT, spaceBefore=2, spaceAfter=8))
    
    # Recipient
    recip_html = f"<b>To: {recipient.get('to', '')}</b><br/>{recipient.get('group', '')}<br/>{recipient.get('institution', '')}"
    story.append(Paragraph(recip_html, to_style))
    story.append(Spacer(1, 7))
    
    # Subject
    story.append(Paragraph(f"<b>Subject: {subject_text}</b>", subject_style))
    story.append(Spacer(1, 6))
    
    # Opening
    story.append(Paragraph(opening, body_style))
    story.append(Spacer(1, 4))
    
    # Paragraphs
    for p in paragraphs:
        story.append(Paragraph(p, body_style))
        story.append(Spacer(1, 4))
    
    # Projects
    for proj in projects:
        name = proj.get("name", "")
        tag = proj.get("tag", "")
        summary = proj.get("summary", "")
        p_html = f"• <b>{name}</b> ({tag}): {summary}"
        story.append(Paragraph(p_html, bullet_style))
        story.append(Spacer(1, 3))
    
    story.append(Spacer(1, 2))
    
    # Closing Paragraphs
    for cp in closing_paragraphs:
        story.append(Paragraph(cp, body_style))
        story.append(Spacer(1, 4))

    # Live Interactive Web Dossier Invitation Box
    callout_html = (
        f"<font color='#4338ca'><b>🌐 {invitation.get('title', 'Live Interactive Portfolio')}:</b></font> "
        f"{invitation.get('text', '')} "
        f"<font color='#4f46e5'><b><link href='{invitation.get('url', 'https://carrommad.github.io/cool-cv/')}'>"
        f"<u>{invitation.get('url_display', 'carrommad.github.io/cool-cv')}</u></link></b></font>"
    )
    callout_table = Table([[Paragraph(callout_html, callout_style)]], colWidths=[519])
    callout_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(callout_table)
    story.append(Spacer(1, 6))
    
    # Signoff
    signoff_html = (
        f"{signoff.get('greeting', 'Warm regards,')}<br/><br/>"
        f"<b>{signoff.get('name', 'Carlos Romero Madrid')}</b><br/>"
        f"<font color='#64748b' size=8.5>{signoff.get('title', '')}<br/>"
        f"{signoff.get('contact', '')} · "
        f"<font color='#4f46e5'><link href='{signoff.get('web_url', 'https://carrommad.github.io/cool-cv/')}'>"
        f"<b>{invitation.get('url_display', 'carrommad.github.io/cool-cv')}</b></link></font></font>"
    )
    story.append(Paragraph(signoff_html, to_style))
    
    doc.build(story)
    print("Cover letter generated from cover_letter.json:", pdf_filename)

if __name__ == "__main__":
    generate_cover_letter()

