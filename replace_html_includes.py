from pathlib import Path
path = Path(r'c:\Users\user\Desktop\Personal\UiUX-1.html')
text = path.read_text(encoding='utf-8')
start = text.index('<style>')
end = text.index('</style>', start) + len('</style>')
text = text[:start] + '<link rel="stylesheet" href="UiUX-1.css">\n' + text[end:]
start = text.rfind('<script>')
end = text.index('</script>', start) + len('</script>')
text = text[:start] + '<script src="UiUX-1.js"></script>\n' + text[end:]
path.write_text(text, encoding='utf-8')
print('Updated HTML with external CSS and JS')
