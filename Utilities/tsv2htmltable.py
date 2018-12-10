#!/usr/bin/env python
import sys
if len(sys.argv) == 1:
    print("File name parameter missing", file=sys.stderr)
with open(sys.argv[1], 'rt') as tsv_file:
    headers=tsv_file.readline().split('\t')
    body=[]
    for row in tsv_file:
        row = row.strip()
        if len(row):
            body.append(row.split('\t'))
def table_row(row, header=False):
    '''Return an HTML table row.'''
    html='<tr>\n'
    for cell in row:
        html += '\n<th scope="col">' if header else '<td>'
        html += "\n"+cell+"\n"
        html += '</th>\n' if header else '</td>\n'
    html += '\n</tr>\n'
    return html
print(f'''<table>
<thead>
    {table_row(headers, True)}
</thead>
<tbody>
{''.join([table_row(row) for row in body])}
</tbody>
</table>''')
