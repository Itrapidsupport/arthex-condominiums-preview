# Arthex photos (harvest/media, from arthex.ca wp-content) -> public/img/<id>-<w>.webp + src/data/images.json
import json, os
from PIL import Image
H = os.path.join(os.path.dirname(__file__), '..', '..', 'harvest', 'media')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'img')
os.makedirs(OUT, exist_ok=True)
SRC = {
  'townhomes': '3-storey-townhomes.jpg', 'highrise': 'white-high-rise.jpg', 'gazebo': 'gazebo-on-water-new.jpg',
  'waterfront': 'burlington-water-front.jpg', 'columns': 'columns-2.jpg', 'expertise': 'our-expertise.jpg',
  'licensed': 'licensed-processional-team.jpg', 'transitions': 'hassle-free-transitions.jpg',
  'fees': 'affordable-mgmt-fees-3.jpg', 'inclusive': 'all-inclusive-property-mgmt-fees.jpg', 'legislation': 'legislation.jpg',
  'proposal': 'request-proposals.jpg', 'contact': 'contact2.jpg', 'status': 'order-status2.jpg', 'team': 'team.jpg',
  'property4': 'property-pic-4.jpg', 'property1': 'property-pic-1.jpg', 'building': 'main_background_arthex.jpg', 'blurred': 'blurred-building-bg.jpg',
}
man = {}
for k, f in SRC.items():
    im = Image.open(os.path.join(H, f))
    if im.mode != 'RGB': im = im.convert('RGB')
    ws = [w for w in (480, 960, 1440, 1920) if w < im.width] + [im.width]
    ws = sorted(set(ws))
    for w in ws:
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS) if w != im.width else im
        r.save(os.path.join(OUT, f'{k}-{w}.webp'), 'WEBP', quality=82, method=6)
    man[k] = {'w': im.width, 'h': im.height, 'ws': ws}
json.dump(man, open(os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'images.json'), 'w'), indent=1)
# logos
B = os.path.join(os.path.dirname(__file__), '..', 'public', 'brand')
os.makedirs(B, exist_ok=True)
for f in ['arthex-property-management-2.png', 'arthex-2019-logo.png', 'arthex-ico.png', 'acmo.png', 'cci-golden-horseshoe.png', 'bbb-a.png', '50-years-experience.png']:
    Image.open(os.path.join(H, f)).save(os.path.join(B, f), optimize=True)
ico = Image.open(os.path.join(H, 'arthex-ico.png')).convert('RGBA')
pad = Image.new('RGBA', (100, 100), (255, 255, 255, 255)); pad.paste(ico, (0, 0), ico)
pad.resize((180, 180), Image.LANCZOS).save(os.path.join(B, '..', 'apple-touch-icon.png'))
ico.save(os.path.join(B, '..', 'favicon.png'))
print(json.dumps({k: v['w'] for k, v in man.items()}))
