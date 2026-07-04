const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.js'));

const mappings = {
  'CocinaPedidosScreen.js': {
    headerTitle: 'Cocina - Pedidos',
    subTitle: 'Revisar Pedidos',
    subSubtitle: 'Pedidos desde mesero',
    iconName: 'chef-hat',
    iconLibrary: 'MaterialCommunityIcons',
    iconColor: '#D29034',
    onPress: "() => navigation.navigate('Inventario')"
  },
  'CocinaInventarioScreen.js': {
    headerTitle: 'Cocina - Inventario',
    subTitle: 'Inventario',
    subSubtitle: 'Productos disponibles',
    iconName: 'chef-hat',
    iconLibrary: 'MaterialCommunityIcons',
    iconColor: '#D29034'
  },
  'CajaCuentaScreen.js': {
    headerTitle: 'Caja - Cuenta',
    subTitle: 'Coffee',
    subSubtitle: 'Integrated Management System',
    iconName: 'currency-usd',
    iconLibrary: 'MaterialCommunityIcons',
    iconColor: '#28A745',
    showBorder: true
  },
  'CajaInicioScreen.js': {
    headerTitle: 'Caja - Inicio',
    subTitle: 'Coffee',
    subSubtitle: 'Integrated Management System',
    iconName: 'currency-usd',
    iconLibrary: 'MaterialCommunityIcons',
    iconColor: '#28A745',
    showBorder: true
  },
  'SolicitudSuministrosScreen.js': {
    headerTitle: 'Caja - Suministros',
    subTitle: 'Coffee',
    subSubtitle: 'Integrated Management System',
    iconName: 'cube',
    iconLibrary: 'Ionicons',
    iconColor: '#D97706',
    showBorder: true
  },
  'StockProductosScreen.js': {
    headerTitle: 'Stock - Gestión',
    subTitle: 'Stock de Productos',
    subSubtitle: 'Gestión de inventario',
    iconName: 'cube',
    iconLibrary: 'Ionicons',
    iconColor: '#D97706',
    showBorder: true
  }
};

files.forEach(file => {
  const filePath = path.join(screensDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Inject component imports
  if (!content.includes('../components/Header')) {
    content = content.replace(
      /import \{ Ionicons, MaterialCommunityIcons \} from '@expo\/vector-icons';|import \{ Ionicons \} from '@expo\/vector-icons';/,
      match => `${match}\nimport Header from '../components/Header';\nimport SubHeader from '../components/SubHeader';`
    );
  }

  const map = mappings[file];
  if (map) {
    // Replace Header block
    content = content.replace(
      /\{\/\* Header \*\/\}\s*<View style=\{styles\.header\}>[\s\S]*?<\/View>/,
      `<Header title="${map.headerTitle}" />`
    );

    // Replace SubHeader block
    const onPressProp = map.onPress ? ` onRightIconPress={${map.onPress}}` : '';
    const borderProp = map.showBorder ? ' showBorder' : '';
    const subHeaderComponent = `<SubHeader 
        title="${map.subTitle}" 
        subtitle="${map.subSubtitle}" 
        rightIconName="${map.iconName}" 
        rightIconLibrary="${map.iconLibrary}" 
        rightIconColor="${map.iconColor}"${onPressProp}${borderProp}
      />`;
    
    content = content.replace(
      /<View style=\{styles\.subHeader\}>[\s\S]*?<\/View>\s*<\/View>|<View style=\{styles\.subHeader\}>[\s\S]*?<\/TouchableOpacity>\s*<\/View>/,
      subHeaderComponent
    );
    // Some files had a slightly different ending tag, catch both:
    // If it didn't replace, try a more aggressive regex
    if (content.includes('style={styles.subHeader}')) {
        content = content.replace(
            /<View style=\{styles\.subHeader\}>[\s\S]*?<\/TouchableOpacity>\s*<\/View>|<View style=\{styles\.subHeader\}>[\s\S]*?<\/View>\s*(?=\{\/\*|Tabs|<ScrollView)/g,
            subHeaderComponent + '\n\n      '
        );
    }
  }

  // Remove header styles
  content = content.replace(/header: \{[\s\S]*?\},/g, '');
  content = content.replace(/headerText: \{[\s\S]*?\},/g, '');
  content = content.replace(/iconButton: \{[\s\S]*?\},/g, '');
  
  // Remove subheader styles
  content = content.replace(/subHeader: \{[\s\S]*?\},/g, '');
  content = content.replace(/titleRow: \{[\s\S]*?\},/g, '');
  content = content.replace(/titleTextContainer: \{[\s\S]*?\},/g, '');
  content = content.replace(/title: \{[\s\S]*?\},/g, '');
  content = content.replace(/subtitle: \{[\s\S]*?\},/g, '');
  content = content.replace(/chefIconContainer: \{[\s\S]*?\},/g, '');
  content = content.replace(/cashIconContainer: \{[\s\S]*?\},/g, '');
  content = content.replace(/boxIconContainer: \{[\s\S]*?\},/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Refactoring complete!');
