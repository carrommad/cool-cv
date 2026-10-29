#!/usr/bin/env python3
"""
Cool-CV Studio Dev Server with Direct File Persistence API.
Serves static files and accepts POST /api/save to directly update index.html on disk.
Usage: python3 scripts/dev_studio.py [port]
"""

import http.server
import socketserver
import json
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
WORKSPACE_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH = os.path.join(WORKSPACE_ROOT, "index.html")

class StudioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WORKSPACE_ROOT, **kwargs)

    def do_POST(self):
        if self.path == "/api/save":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            try:
                payload = json.loads(post_data.decode("utf-8"))
                html_content = payload.get("html", "")
                if not html_content or "<html" not in html_content:
                    self.send_response(400)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "error", "message": "Invalid HTML"}).encode("utf-8"))
                    return

                # Write directly to index.html
                with open(INDEX_PATH, "w", encoding="utf-8") as f:
                    f.write(html_content)

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "success",
                    "message": "Directly saved to index.html successfully",
                    "bytes": len(html_content)
                }).encode("utf-8"))
                print(f"[Studio API] Successfully updated index.html ({len(html_content)} bytes)")
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), StudioHandler) as httpd:
        print(f"==================================================")
        print(f"  Cool-CV Studio Dev Server running on port {PORT}")
        print(f"  Visual Studio URL: http://localhost:{PORT}/builder.html?admin=coolcv-admin&edit=true")
        print(f"  Public Preview:    http://localhost:{PORT}/")
        print(f"==================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
