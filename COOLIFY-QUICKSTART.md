# 🚀 Coolify Quick Start Guide

## Schnell-Anleitung: Todo-App auf Coolify deployen

### Option 1: Mit Dockerfile (Empfohlen)

#### Schritt 1: Repository vorbereiten
```bash
# Falls noch nicht initialisiert
git init
git add .
git commit -m "Ready for Coolify deployment"
git remote add origin https://github.com/YOUR-USERNAME/todo-app.git
git push -u origin main
```

#### Schritt 2: In Coolify deployen

1. **Coolify Dashboard** → `+ New Resource` → `Application`

2. **Git Repository auswählen**:
   - URL: `https://github.com/YOUR-USERNAME/todo-app.git`
   - Branch: `main`

3. **Build Konfiguration**:
   - Build Pack: `Dockerfile`
   - Dockerfile Path: `./Dockerfile`
   - Context: `./` (oder `/to-do` falls Monorepo)

4. **Environment Variables hinzufügen**:
   ```
   PB_URL=https://pocketbase.yanisdaengeli.ch
   ```

5. **Port Konfiguration**:
   - Internal Port: `3000`
   - Public Port: `80` oder `443`

6. **Domain hinzufügen**:
   - z.B. `todo.yourdomain.com`
   - SSL wird automatisch generiert ✅

7. **Deploy klicken** 🚀

#### Schritt 3: Fertig!
- Warte 2-3 Minuten auf den Build
- Öffne deine Domain
- App ist live! 🎉

---

### Option 2: Mit Docker Compose

#### Schritt 1: Coolify Setup

1. **Coolify Dashboard** → `+ New Resource` → `Docker Compose`

2. **Git Repository auswählen**

3. **Docker Compose Konfiguration**:
   - Compose File: `./docker-compose.yml`
   - Environment Variables setzen:
     ```
     PB_URL=https://pocketbase.yanisdaengeli.ch
     ```

4. **Deploy** 🚀

---

### Option 3: Mit Nixpacks (Kein Dockerfile nötig)

#### Schritt 1: Dockerfile entfernen oder umbenennen
```bash
mv Dockerfile Dockerfile.backup
```

#### Schritt 2: In Coolify deployen

1. **Coolify Dashboard** → `+ New Resource` → `Application`

2. **Git Repository auswählen**

3. **Build Konfiguration**:
   - Build Pack: `Nixpacks` (wird automatisch erkannt)
   - Coolify nutzt die `nixpacks.toml` Datei

4. **Environment Variables** und **Domain** wie oben setzen

5. **Deploy** 🚀

---

## 🔧 Environment Variables Reference

Füge diese in Coolify unter **Environment Variables** hinzu:

```bash
# Erforderlich
PB_URL=https://pocketbase.yanisdaengeli.ch

# Optional (werden automatisch gesetzt)
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

---

## 🔄 Auto-Deploy einrichten

### GitHub Webhook

1. **In Coolify**:
   - Application → Settings → Webhooks
   - URL kopieren (z.B. `https://coolify.yourdomain.com/api/v1/deploy/xxx`)

2. **In GitHub**:
   - Repository → Settings → Webhooks → Add webhook
   - Payload URL: *Coolify Webhook URL einfügen*
   - Content type: `application/json`
   - Events: `Just the push event`
   - Active: ✅
   - Save

Jetzt deployt Coolify automatisch bei jedem Git Push! 🎯

---

## 🏥 Health Check

Coolify prüft automatisch:
- Endpoint: `/`
- Interval: 30s
- Timeout: 10s
- Retries: 3

Falls die App nicht erreichbar ist, startet Coolify sie automatisch neu.

---

## 📊 Monitoring & Logs

### Live Logs anzeigen
- Coolify Dashboard → Deine App → Logs
- Real-time Updates
- Filtere nach Error/Warning

### Resource Monitoring
- CPU Usage
- Memory Usage
- Network Traffic
- Restart Count

---

## 🐛 Troubleshooting

### Build schlägt fehl

**Problem**: `npm ci` Fehler
**Lösung**:
```bash
# Lokal testen
rm -rf node_modules package-lock.json
npm install
npm run build
git add package-lock.json
git commit -m "Update package-lock"
git push
```

### Container startet nicht

**Problem**: Exit Code 1
**Lösung**:
1. Logs in Coolify prüfen
2. Environment Variable `PB_URL` überprüfen
3. Manuell testen:
```bash
docker run -p 3000:3000 -e PB_URL=https://pocketbase.yanisdaengeli.ch dein-image
```

### 502 Bad Gateway

**Problem**: App nicht erreichbar
**Lösung**:
- Port 3000 überprüfen (intern)
- Health Check Logs prüfen
- Container Restart erzwingen

---

## 🎯 Performance Tipps

### Resource Limits setzen
```
CPU: 0.5 - 1 core
Memory: 256MB - 512MB
```

### Caching optimieren
- Docker Layer Cache nutzen (automatisch in Coolify)
- Next.js Build Cache aktiviert durch `output: 'standalone'`

### Scaling
- Horizontal: Mehrere Container (Load Balancing)
- Vertical: Mehr CPU/Memory pro Container

---

## ✅ Deployment Checklist

- [ ] Git Repository gepusht
- [ ] Coolify App erstellt
- [ ] Environment Variable `PB_URL` gesetzt
- [ ] Domain konfiguriert
- [ ] SSL-Zertifikat generiert (automatisch)
- [ ] Erster Deploy erfolgreich
- [ ] App funktioniert (Todo erstellen/löschen testen)
- [ ] Auto-Deploy Webhook eingerichtet
- [ ] Monitoring aktiviert
- [ ] Backup-Strategie definiert

---

## 🆘 Support

**Coolify Issues**: https://github.com/coollabsio/coolify/issues
**Discord**: https://discord.gg/coolify
**Docs**: https://coolify.io/docs

**Next.js Issues**: https://github.com/vercel/next.js/issues

---

## 🎉 Fertig!

Deine Todo-App läuft jetzt auf Coolify!

- 🌐 Domain mit SSL
- 🔄 Auto-Deploy bei Git Push
- 📊 Monitoring & Logs
- 🏥 Health Checks
- 🚀 Production-Ready
