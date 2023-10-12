from http.server import SimpleHTTPRequestHandler, HTTPServer
import cgi

class MyRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(MyRequestHandler, self).end_headers()
        
    def do_POST(self):
        content_type, _ = cgi.parse_header(self.headers.get('content-type'))
        if content_type == 'application/x-www-form-urlencoded':
            content_length = int(self.headers.get('content-length'))
            post_data = self.rfile.read(content_length).decode('utf-8')
            post_data = post_data[8:]
            #Temporary workaround, remember to never use + character in post requests
            post_data = post_data.replace("+", " ")
            with open('toggle.txt', 'w') as file:
                file.write(post_data)
            end_headers(self)

def run_server():
    host = '0.0.0.0'
    port = 8000
    server_address = (host, port)
    httpd = HTTPServer(server_address, MyRequestHandler)
    print(f'Server running on {host}:{port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
