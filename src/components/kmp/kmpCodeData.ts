export interface KmpFile {
  id: string;
  filename: string;
  category: 'build' | 'domain' | 'ui' | 'platform' | 'guide';
  language: 'kotlin' | 'toml' | 'markdown';
  description: string;
  code: string;
}

export const KMP_PROJECT_FILES: KmpFile[] = [
  {
    id: 'libs-versions',
    filename: 'gradle/libs.versions.toml',
    category: 'build',
    language: 'toml',
    description: 'Version Catalog mit Compose Multiplatform, Haze, Coil 3, Koin, QRose & kotlinx-datetime',
    code: `[versions]
agp = "8.7.2"
kotlin = "2.1.0"
compose-multiplatform = "1.7.1"
haze = "1.2.0"
coil3 = "3.0.4"
kotlinx-datetime = "0.6.1"
kotlinx-coroutines = "1.9.0"
koin = "4.0.0"
qrose = "1.0.1"
lifecycle = "2.8.4"

[libraries]
# Compose Multiplatform
compose-ui = { module = "org.jetbrains.compose.ui:ui", version.ref = "compose-multiplatform" }
compose-foundation = { module = "org.jetbrains.compose.foundation:foundation", version.ref = "compose-multiplatform" }
compose-material3 = { module = "org.jetbrains.compose.material3:material3", version.ref = "compose-multiplatform" }
compose-components-resources = { module = "org.jetbrains.compose.components:components-resources", version.ref = "compose-multiplatform" }

# Glassmorphism Backdrop Blur
haze = { module = "dev.chrisbanes.haze:haze", version.ref = "haze" }
haze-materials = { module = "dev.chrisbanes.haze:haze-materials", version.ref = "haze" }

# Image Loading
coil-compose = { module = "io.coil-kt.coil3:coil-compose", version.ref = "coil3" }
coil-network-ktor = { module = "io.coil-kt.coil3:coil-network-ktor3", version.ref = "coil3" }

# DateTime & Coroutines
kotlinx-datetime = { module = "org.jetbrains.kotlinx:kotlinx-datetime", version.ref = "kotlinx-datetime" }
kotlinx-coroutines-core = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlinx-coroutines" }

# Koin Dependency Injection
koin-core = { module = "io.insert-koin:koin-core", version.ref = "koin" }
koin-compose = { module = "io.insert-koin:koin-compose", version.ref = "koin" }
koin-compose-viewmodel = { module = "io.insert-koin:koin-compose-viewmodel", version.ref = "koin" }

# QR Code Generation for Member Card
qrose = { module = "io.github.alexzhirkevich:qrose", version.ref = "qrose" }

[plugins]
androidApplication = { id = "com.android.application", version.ref = "agp" }
androidLibrary = { id = "com.android.library", version.ref = "agp" }
kotlinMultiplatform = { id = "org.jetbrains.kotlin.multiplatform", version.ref = "kotlin" }
composeMultiplatform = { id = "org.jetbrains.compose", version.ref = "compose-multiplatform" }
composeCompiler = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }`,
  },
  {
    id: 'build-gradle-app',
    filename: 'composeApp/build.gradle.kts',
    category: 'build',
    language: 'kotlin',
    description: 'Multiplatform Konfiguration für Android & iOS Targets mit geteiltem commonMain',
    code: `import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
}

kotlin {
    androidTarget {
        compilerOptions {
            jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
        }
    }
    
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "ComposeApp"
            isStatic = true
        }
    }
    
    sourceSets {
        commonMain.dependencies {
            implementation(compose.runtime)
            implementation(compose.foundation)
            implementation(compose.material3)
            implementation(compose.ui)
            implementation(compose.components.resources)
            
            // Haze Liquid-Glass
            implementation(libs.haze)
            implementation(libs.haze.materials)
            
            // Coil 3
            implementation(libs.coil.compose)
            
            // DateTime & Coroutines
            implementation(libs.kotlinx.datetime)
            implementation(libs.kotlinx.coroutines.core)
            
            // Koin DI & ViewModel
            implementation(libs.koin.core)
            implementation(libs.koin.compose)
            implementation(libs.koin.compose.viewmodel)
            
            // QRose QR-Code Engine
            implementation(libs.qrose)
        }
        
        androidMain.dependencies {
            implementation(compose.preview)
            implementation(libs.koin.core)
        }
        
        iosMain.dependencies {
        }
    }
}

android {
    namespace = "ch.moschee.salmsach"
    compileSdk = 35

    defaultConfig {
        applicationId = "ch.moschee.salmsach"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}`,
  },
  {
    id: 'expect-platform',
    filename: 'composeApp/src/commonMain/kotlin/ch/moschee/salmsach/platform/PlatformActions.kt',
    category: 'platform',
    language: 'kotlin',
    description: 'expect Interface für plattformspezifische Aktionen (Anrufen & TWINT)',
    code: `package ch.moschee.salmsach.platform

/**
 * Plattformspezifische Aktionen (expect/actual)
 * Erlaubt das native Anrufen und das Öffnen der Schweizer TWINT-App
 */
expect object PlatformActions {
    /**
     * Startet den nativen Telefonanruf
     */
    fun dialPhoneNumber(phoneNumber: String)

    /**
     * Öffnet die Schweizer TWINT Applikation mit Betrag und Verwendungszweck
     */
    fun openTwintApp(iban: String, amount: Double, message: String): Boolean
}`,
  },
  {
    id: 'actual-android',
    filename: 'composeApp/src/androidMain/kotlin/ch/moschee/salmsach/platform/PlatformActions.android.kt',
    category: 'platform',
    language: 'kotlin',
    description: 'actual Android-Implementierung via Intent (DIAL & TWINT Scheme)',
    code: `package ch.moschee.salmsach.platform

import android.content.Context
import android.content.Intent
import android.net.Uri

actual object PlatformActions {
    private var appContext: Context? = null

    fun initialize(context: Context) {
        appContext = context.applicationContext
    }

    actual fun dialPhoneNumber(phoneNumber: String) {
        val context = appContext ?: return
        val cleanPhone = phoneNumber.replace(" ", "")
        val intent = Intent(Intent.ACTION_DIAL).apply {
            data = Uri.parse("tel:\$cleanPhone")
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        context.startActivity(intent)
    }

    actual fun openTwintApp(iban: String, amount: Double, message: String): Boolean {
        val context = appContext ?: return false
        val uri = Uri.parse("twint://payment?iban=\$iban&amount=\$amount&message=\$message")
        val intent = Intent(Intent.ACTION_VIEW, uri).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        return try {
            context.startActivity(intent)
            true
        } catch (e: Exception) {
            // Fallback auf Play Store oder Web
            val storeIntent = Intent(
                Intent.ACTION_VIEW,
                Uri.parse("market://search?q=TWINT")
            ).apply { flags = Intent.FLAG_ACTIVITY_NEW_TASK }
            try {
                context.startActivity(storeIntent)
            } catch (_: Exception) {}
            false
        }
    }
}`,
  },
  {
    id: 'actual-ios',
    filename: 'composeApp/src/iosMain/kotlin/ch/moschee/salmsach/platform/PlatformActions.ios.kt',
    category: 'platform',
    language: 'kotlin',
    description: 'actual iOS-Implementierung via UIApplication.openURL',
    code: `package ch.moschee.salmsach.platform

import platform.Foundation.NSURL
import platform.UIKit.UIApplication

actual object PlatformActions {
    actual fun dialPhoneNumber(phoneNumber: String) {
        val cleanPhone = phoneNumber.replace(" ", "")
        val url = NSURL.URLWithString("tel:\$cleanPhone") ?: return
        if (UIApplication.sharedApplication.canOpenURL(url)) {
            UIApplication.sharedApplication.openURL(url)
        }
    }

    actual fun openTwintApp(iban: String, amount: Double, message: String): Boolean {
        // Schweizer TWINT Deep Link URL Scheme
        val twintUrl = NSURL.URLWithString("twint://payment?iban=\$iban&amount=\$amount")
        if (twintUrl != null && UIApplication.sharedApplication.canOpenURL(twintUrl)) {
            UIApplication.sharedApplication.openURL(twintUrl)
            return true
        }
        
        // Fallback: App Store Suche nach TWINT
        val appStoreUrl = NSURL.URLWithString("https://apps.apple.com/app/twint/id1190532289")
        if (appStoreUrl != null) {
            UIApplication.sharedApplication.openURL(appStoreUrl)
        }
        return false
    }
}`,
  },
  {
    id: 'glass-card-kmp',
    filename: 'composeApp/src/commonMain/kotlin/ch/moschee/salmsach/ui/components/GlassCard.kt',
    category: 'ui',
    language: 'kotlin',
    description: 'Wiederverwendbare GlassCard Komponente mit ChrisBanes Haze Glassmorphismus',
    code: `package ch.moschee.salmsach.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import dev.chrisbanes.haze.HazeState
import dev.chrisbanes.haze.hazeChild
import ch.moschee.salmsach.ui.theme.SalmsachColors

/**
 * Reusable Liquid-Glass Panel mit Haze-Backdrop-Blur
 * Light Mode: 70% Weiß, dezente Ränder
 * Dark Mode: 5-10% Dunkelgrau, weicher Schimmer
 */
@Composable
fun GlassCard(
    modifier: Modifier = Modifier,
    hazeState: HazeState? = null,
    isDark: Boolean = false,
    cornerRadius: Dp = 24.dp,
    content: @Composable BoxScope.() -> Unit
) {
    val backgroundColor = if (isDark) {
        Color(0xFF0F172A).copy(alpha = 0.40f)
    } else {
        Color.White.copy(alpha = 0.70f)
    }

    val borderColor = if (isDark) {
        Color.White.copy(alpha = 0.12f)
    } else {
        Color.White.copy(alpha = 0.60f)
    }

    val shape = RoundedCornerShape(cornerRadius)

    val hazeModifier = if (hazeState != null) {
        modifier.hazeChild(
            state = hazeState,
            shape = shape,
            blurRadius = 20.dp
        )
    } else {
        modifier
    }

    Surface(
        modifier = hazeModifier,
        shape = shape,
        color = backgroundColor,
        border = BorderStroke(1.dp, borderColor),
        shadowElevation = if (isDark) 0.dp else 4.dp
    ) {
        Box(content = content)
    }
}`,
  },
  {
    id: 'prayer-engine-kmp',
    filename: 'composeApp/src/commonMain/kotlin/ch/moschee/salmsach/domain/PrayerTimeEngine.kt',
    category: 'domain',
    language: 'kotlin',
    description: 'Berechnungs-Engine für Gebetszeiten und Live-Countdown mit StateFlow',
    code: `package ch.moschee.salmsach.domain

import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.datetime.*
import ch.moschee.salmsach.domain.model.PrayerTime
import ch.moschee.salmsach.domain.model.PrayerScheduleState

class PrayerTimeEngine {
    // Feste Koordinaten: Salmsach TG (47.55° N, 9.37° E)
    private val prayerSchedule = listOf(
        PrayerTime("fajr", "Fajr", "الفجر", 5, 34),
        PrayerTime("shuruk", "Shuruk", "الشروق", 7, 12),
        PrayerTime("dhuhr", "Dhuhr", "الظهر", 13, 15),
        PrayerTime("asr", "Asr", "العصر", 16, 28),
        PrayerTime("maghrib", "Maghrib", "المغرب", 18, 48),
        PrayerTime("isha", "Isha", "العشاء", 20, 15)
    )

    /**
     * Liefert sekündlich aktualisierten Gebetszeiten-Status mit Countdown
     */
    fun observeSchedule(): Flow<PrayerScheduleState> = flow {
        while (true) {
            val now = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault())
            val currentMinutesOfDay = now.hour * 60 + now.minute
            val currentSecondsOfDay = currentMinutesOfDay * 60 + now.second

            var nextPrayer = prayerSchedule.firstOrNull { 
                (it.hour * 60 + it.minute) * 60 > currentSecondsOfDay 
            }

            val remainingSeconds: Int
            if (nextPrayer != null) {
                val targetSeconds = (nextPrayer.hour * 60 + nextPrayer.minute) * 60
                remainingSeconds = targetSeconds - currentSecondsOfDay
            } else {
                // Nächstes Fajr am Folgetag
                nextPrayer = prayerSchedule.first()
                val targetSeconds = (24 * 3600) + (nextPrayer.hour * 60 + nextPrayer.minute) * 60
                remainingSeconds = targetSeconds - currentSecondsOfDay
            }

            val hours = remainingSeconds / 3600
            val minutes = (remainingSeconds % 3600) / 60
            val seconds = remainingSeconds % 60
            val formatted = "\${hours}h \${minutes}m \${seconds}s"

            emit(
                PrayerScheduleState(
                    prayers = prayerSchedule,
                    nextPrayerId = nextPrayer.id,
                    countdownFormatted = "Nächstes Gebet: \${nextPrayer.name} in \$formatted",
                    remainingSeconds = remainingSeconds
                )
            )
            delay(1000)
        }
    }
}`,
  },
  {
    id: 'viewmodel-kmp',
    filename: 'composeApp/src/commonMain/kotlin/ch/moschee/salmsach/ui/viewmodel/MoscheeViewModel.kt',
    category: 'domain',
    language: 'kotlin',
    description: 'MVVM ViewModel mit unidirektionalem StateFlow (Tabs, Modals, Feed, Gebete)',
    code: `package ch.moschee.salmsach.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import ch.moschee.salmsach.domain.PrayerTimeEngine
import ch.moschee.salmsach.data.MoscheeRepository
import ch.moschee.salmsach.platform.PlatformActions

enum class AppTab { FEED, MOSCHEE, PROFIL }
enum class ActiveBottomSheet { NONE, NEW_POST, MEMBER_CARD, NOTIFICATIONS, SETTINGS, TWINT_DONATION }

data class MoscheeUiState(
    val currentTab: AppTab = AppTab.MOSCHEE,
    val activeSheet: ActiveBottomSheet = ActiveBottomSheet.NONE,
    val isDarkMode: Boolean = false,
    val pushNotificationsEnabled: Boolean = true,
    val countdownText: String = "Lade Gebetszeiten...",
    val activePrayerId: String = "asr"
)

class MoscheeViewModel(
    private val repository: MoscheeRepository,
    private val prayerEngine: PrayerTimeEngine
) : ViewModel() {

    private val _uiState = MutableStateFlow(MoscheeUiState())
    val uiState: StateFlow<MoscheeUiState> = _uiState.asStateFlow()

    val announcements = repository.getAnnouncements()
    val posts = repository.getCommunityPosts()
    val userProfile = repository.getUserProfile()
    val boardMembers = repository.getBoardMembers()

    init {
        viewModelScope.launch {
            prayerEngine.observeSchedule().collect { schedule ->
                _uiState.update { 
                    it.copy(
                        countdownText = schedule.countdownFormatted,
                        activePrayerId = schedule.nextPrayerId
                    )
                }
            }
        }
    }

    fun selectTab(tab: AppTab) = _uiState.update { it.copy(currentTab = tab) }
    fun openSheet(sheet: ActiveBottomSheet) = _uiState.update { it.copy(activeSheet = sheet) }
    fun closeSheet() = _uiState.update { it.copy(activeSheet = ActiveBottomSheet.NONE) }
    fun toggleDarkMode() = _uiState.update { it.copy(isDarkMode = !it.isDarkMode) }

    fun addPost(content: String) {
        viewModelScope.launch {
            repository.createPost(content)
            closeSheet()
        }
    }

    fun callMember(phone: String) {
        PlatformActions.dialPhoneNumber(phone)
    }

    fun launchTwint(amount: Double) {
        PlatformActions.openTwintApp("CH8209000000123456789", amount, "Spende Moschee Salmsach")
    }
}`,
  },
  {
    id: 'setup-guide',
    filename: 'SETUP_ANLEITUNG.md',
    category: 'guide',
    language: 'markdown',
    description: 'Vollständige Anleitung zum Starten des Projekts auf Android & iOS',
    code: `# Moschee Salmsach - Setup & Start-Anleitung

## Voraussetzungen
- **Android Studio** (Koala Feature Drop 2024.1.2 oder Ladybug / Meerkat)
- **Xcode** 15+ (für iOS Build auf macOS)
- **JDK 17** oder JDK 21
- **Kotlin Multiplatform Plugin** in Android Studio aktiviert

---

## 1. Projekt öffnen
1. Klone oder entpacke das Projektverzeichnis.
2. Öffne den Projektordner in **Android Studio**.
3. Warte, bis der Gradle Sync abgeschlossen ist (\`./gradlew build\`).

---

## 2. Android App ausführen
1. Wähle in der Ausführungsleiste das Target **\`composeApp\`** und ein Android-Gerät/Emulator (API 26+).
2. Klicke auf den grünen **Run-Button (Play)** oder führe im Terminal aus:
\`\`\`bash
./gradlew :composeApp:installDebug
\`\`\`

---

## 3. iOS App ausführen (macOS)
### Option A: Direkt aus Android Studio
1. Installiere das **Kotlin Multiplatform Mobile** Plugin.
2. Wähle das iOS Simulator Target (z. B. *iPhone 16 Pro*).
3. Klicke auf **Run**.

### Option B: Über Xcode
1. Öffne das generierte Xcode Projekt im Unterordner \`iosApp\`:
\`\`\`bash
cd iosApp
open iosApp.xcodeproj
\`\`\`
2. Wähle dein iOS Gerät oder den Simulator.
3. Drücke **Cmd + R** zum Bauen und Starten.

---

## 4. Architektur-Übersicht
- **\`commonMain\`**: 100 % geteilter UI Code in Compose Multiplatform, Haze Glassmorphismus, ViewModels, Repository.
- **\`androidMain\`**: \`PlatformActions.android.kt\` (Intent für Anrufe & TWINT).
- **\`iosMain\`**: \`PlatformActions.ios.kt\` (\`UIApplication.sharedApplication.openURL\`).
- **Farben**: Akzent \`#A58C6F\` (Gold/Braun), Dark Mode \`#020617\`.`,
  },
];
