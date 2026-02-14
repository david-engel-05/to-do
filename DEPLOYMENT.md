# Deployment Guide für Coolify

Diese Anleitung zeigt dir, wie du die Todo-App auf Coolify deployen kannst.

## Voraussetzungen

1. Coolify-Server läuft
2. Git-Repository (GitHub, GitLab, oder Gitea)
3. PocketBase-Instanz ist erreichbar

## Deployment-Schritte

### 1. Git Repository vorbereiten

```bash
cd to-do
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/dein-username/todo-app.git
git push -u origin main
```

### 2. In Coolify neues Projekt erstellen

1. **Coolify Dashboard öffnen**
2. **"+ New Resource" klicken**
3. **"Application" auswählen**

### 3. Projekt konfigurieren

#### Source
- **Type**: Git Repository
- **Repository URL**: `https://github.com/dein-username/todo-app.git`
- **Branch**: `main`
- **Base Directory**: `/to-do` (falls im Monorepo, sonst leer lassen)

#### Build Configuration
- **Build Pack**: Dockerfile
- **Dockerfile Location**: `./Dockerfile`

#### Environment Variables
Füge folgende Environment Variable hinzu:

```
PB_URL=https://pocketbase.yanisdaengeli.ch
```

#### Port Configuration
- **Port**: 3000
- **Published Port**: 80 oder 443 (für HTTPS)

#### Domains
- Füge deine Domain hinzu (z.B., `todo.deinedomain.ch`)
- Coolify generiert automatisch SSL-Zertifikate

### 4. Deploy starten

1. **"Deploy" Button klicken**
2. Coolify wird automatisch:
   - Repository klonen
   - Docker Image bauen
   - Container starten
   - SSL-Zertifikat generieren
   - Reverse Proxy konfigurieren

### 5. Logs überprüfen

- Öffne die Logs in Coolify
- Überprüfe, ob der Build erfolgreich war
- Teste die App unter deiner Domain

## Alternative: Docker Compose in Coolify

Falls du lieber Docker Compose verwendest:

1. **Deployment Type**: Docker Compose
2. **docker-compose.yml** wird automatisch erkannt
3. Environment Variables in Coolify-UI setzen

## Wichtige Hinweise

### Environment Variables

Stelle sicher, dass folgende Variable gesetzt ist:

- `PB_URL`: Die URL deiner PocketBase-Instanz

### Health Checks

Coolify überprüft automatisch die Health des Containers:
- **Endpoint**: `/`
- **Interval**: 30s
- **Timeout**: 10s

### Auto-Deploy bei Git Push

1. In Coolify: **Settings → Webhooks**
2. Webhook-URL kopieren
3. In GitHub/GitLab: Repository → Settings → Webhooks
4. Webhook-URL einfügen
5. Trigger: `push` events

Jetzt wird bei jedem Git Push automatisch neu deployt!

## Troubleshooting

### Build schlägt fehl

```bash
# Lokal testen
docker build -t todo-app .
docker run -p 3000:3000 -e PB_URL=https://pocketbase.yanisdaengeli.ch todo-app
```

### App startet nicht

1. Logs in Coolify prüfen
2. Environment Variables überprüfen
3. PocketBase-Verbindung testen

### Port-Probleme

- Stelle sicher, dass Port 3000 im Dockerfile exposed ist
- Coolify mappt automatisch auf 80/443

## Produktions-Optimierungen

### 1. Resource Limits setzen

In Coolify → Settings → Resources:
```
CPU: 1 core
Memory: 512MB
```

### 2. Auto-Scaling (optional)

Coolify unterstützt Horizontal Pod Autoscaling basierend auf CPU/Memory.

### 3. Backup-Strategie

- Coolify erstellt automatisch Backups der Container-Konfiguration
- PocketBase-Daten separat sichern

### 4. Monitoring

Coolify bietet integriertes Monitoring:
- CPU-Auslastung
- Memory-Verwendung
- Network I/O
- Container-Logs

## Next Steps

Nach erfolgreichem Deployment:

1. ✅ SSL-Zertifikat überprüfen
2. ✅ Funktionalität testen (Todo erstellen, löschen, togglen)
3. ✅ Performance prüfen
4. ✅ Monitoring einrichten
5. ✅ Auto-Deploy konfigurieren

## Support

Bei Problemen:
- [Coolify Docs](https://coolify.io/docs)
- [Coolify Discord](https://discord.gg/coolify)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
