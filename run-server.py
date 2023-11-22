from http.server import SimpleHTTPRequestHandler, HTTPServer
import cgi

class MyRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(MyRequestHandler, self).end_headers()

def run_server():
    host = '0.0.0.0'
    port = 8000
    server_address = (host, port)
    httpd = HTTPServer(server_address, MyRequestHandler)
    print(f'Server running on {host}:{port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()

