const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(screensDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove Bottom Navigation JSX
  content = content.replace(/\{\/\* Bottom Navigation \*\/\}\s*<View style=\{styles\.bottomNav\}>[\s\S]*?<\/View>/, '');

  // Remove bottomNav styles
  content = content.replace(/bottomNav: \{[\s\S]*?\}\);/g, '});');

  // Add useNavigation import if not present
  if (!content.includes('useNavigation')) {
    content = content.replace(
      /import \{ View, Text/,
      "import { useNavigation } from '@react-navigation/native';\nimport { View, Text"
    );
  }

  // Inject useNavigation hook
  if (!content.includes('const navigation = useNavigation();')) {
    content = content.replace(
      /export default function (\w+)\(\) \{/,
      "export default function $1() {\n  const navigation = useNavigation();"
    );
  }

  // Wire up back buttons
  content = content.replace(
    /<TouchableOpacity>\s*<Ionicons name="arrow-back"/g,
    '<TouchableOpacity onPress={() => navigation.goBack()}>\n            <Ionicons name="arrow-back"'
  );

  // Specific wire-ups
  if (file === 'CajaInicioScreen.js') {
    // Wire up 'Solicitud Suministros' card
    content = content.replace(
      /<View style=\{styles\.gridCard\}>\s*<View style=\{\[styles\.circleIcon, \{ backgroundColor: '#F59E0B' \}\]\}>\s*<Ionicons name="cube-outline"/g,
      `<TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('Suministros')}>
            <View style={[styles.circleIcon, { backgroundColor: '#F59E0B' }]}>
              <Ionicons name="cube-outline"`
    );
    // Fix closing tag for TouchableOpacity
    content = content.replace(
      /Suministros<\/Text>\s*<\/View>/g,
      `Suministros</Text>\n          </TouchableOpacity>`
    );
  }
  
  if (file === 'CocinaPedidosScreen.js') {
    // Wire up chef hat to go to Inventario
    content = content.replace(
      /<View style=\{styles\.chefIconContainer\}>/g,
      `<TouchableOpacity style={styles.chefIconContainer} onPress={() => navigation.navigate('Inventario')}>`
    );
    content = content.replace(
      /<\/View>\s*<\/View>\s*\{\/\* Stats \*\/\}/g,
      `</TouchableOpacity>\n      </View>\n\n      {/* Stats */}`
    );
  }

  if (file === 'CajaInicioScreen.js') {
    // We already have a Caja tab. Let's make "Caja Actual" go to CajaCuenta (Cuenta)
    content = content.replace(
      /<View style=\{styles\.gridCard\}>\s*<View style=\{\[styles\.circleIcon, \{ backgroundColor: '#3B82F6' \}\]\}>/g,
      `<TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('Cuenta')}>
            <View style={[styles.circleIcon, { backgroundColor: '#3B82F6' }]}>`
    );
    // Fix closing tag for TouchableOpacity
    content = content.replace(
      /Caja Actual<\/Text>\s*<Text style=\{styles\.cardValue\}>\$2,500\.00<\/Text>\s*<\/View>/g,
      `Caja Actual</Text>\n            <Text style={styles.cardValue}>$2,500.00</Text>\n          </TouchableOpacity>`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Screens patched successfully!');
