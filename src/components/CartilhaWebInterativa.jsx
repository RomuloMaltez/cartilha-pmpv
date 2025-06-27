import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  Users, 
  Shield, 
  TrendingUp, 
  FileText, 
  ExternalLink,
  Home,
  Info,
  Gavel,
  DollarSign
} from 'lucide-react';

const CartilhaWebInterativa = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [expandedCards, setExpandedCards] = useState({});

  // Dados para gráficos
  const comparativoData = [
    { nome: 'Receitas Tributárias', valor: 568, color: '#3B82F6' },
    { nome: 'Autos de Infração', valor: 5.2, color: '#EF4444' }
  ];

  const receitasDetalhadas = [
    { nome: 'ISS', valor: 258.2, percentual: 45.4 },
    { nome: 'VAF-ICMS', valor: 92.1, percentual: 16.2 },
    { nome: 'COSIP', valor: 76.4, percentual: 13.4 },
    { nome: 'IPTU', valor: 41.0, percentual: 7.2 },
    { nome: 'Demais Taxas', valor: 40.2, percentual: 7.1 },
    { nome: 'Taxa Lixo', valor: 35.8, percentual: 6.3 },
    { nome: 'ITBI', valor: 24.9, percentual: 4.4 }
  ];

  const autosInfracao = [
    { tipo: 'Multas de Trânsito', valor: 4494.15, base: 'CTB + normas municipais' },
    { tipo: 'Auto Obras', valor: 335.16, base: 'Lei Complementar nº 560/2014' },
    { tipo: 'Localização/Funcionamento', valor: 192.42, base: 'Lei Complementar nº 873/2021' },
    { tipo: 'Posturas', valor: 82.64, base: 'Lei Complementar nº 873/2021' },
    { tipo: 'Auto Trânsito', valor: 54.95, base: 'CTB + normas municipais' },
    { tipo: 'Vigilância Sanitária', valor: 42.31, base: 'Lei nº 1.562/2003' },
    { tipo: 'Meio Ambiente', valor: 25.21, base: 'Lei Complementar nº 138/2001' }
  ];

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'objetivo', label: 'Objetivo', icon: Info },
    { id: 'constitucional', label: 'Base Legal', icon: Gavel },
    { id: 'comparativo', label: 'Comparativo', icon: TrendingUp },
    { id: 'detalhes', label: 'Detalhes', icon: FileText },
    { id: 'conclusao', label: 'Conclusão', icon: Scale }
  ];

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cores para o gráfico de pizza
  const pieColors = ['#3B82F6', '#2563EB', '#9333EA', '#EC4899', '#EF4444', '#F97316', '#EAB308'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-blue-600" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">Cartilha Ilustrativa</h1>
                <p className="text-sm text-gray-600">Porto Velho - RO</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Conteúdo principal */}
      <main className="pt-16">
        {/* Seção Hero */}
        <section id="inicio" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              CARTILHA ILUSTRATIVA
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
              AUDITORES DO TESOURO vs FISCAIS MUNICIPAIS
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
              Entenda as Diferenças e Competências - VALORES REAIS ATUALIZADOS
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-blue-200 text-sm mb-1">Município</p>
                  <p className="font-bold text-lg">Porto Velho - RO</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Data</p>
                  <p className="font-bold text-lg">Junho de 2025</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Fonte</p>
                  <p className="font-bold text-lg">PLOA 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objetivo */}
        <section id="objetivo" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Info className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-6">🎯 OBJETIVO DESTA CARTILHA</h2>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-10 shadow-lg">
                <p className="text-xl text-gray-700 leading-relaxed text-center">
                  Esta cartilha tem como objetivo esclarecer, de forma didática e visual, as diferenças fundamentais 
                  entre as competências dos <span className="font-bold text-blue-600">Auditores do Tesouro</span> e dos{' '}
                  <span className="font-bold text-red-600">Fiscais Municipais</span> no âmbito do Município de Porto Velho, 
                  com base na legislação vigente e nos <span className="font-bold">dados orçamentários reais</span> do PLOA 2025.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fundamento Constitucional */}
        <section id="constitucional" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Gavel className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-6">⚖️ FUNDAMENTO CONSTITUCIONAL</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-6">
                  <Users className="h-10 w-10 text-blue-600 mr-4" />
                  <h3 className="text-2xl font-bold text-blue-600">Competência Tributária</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  <span className="font-semibold">Exclusiva dos Auditores do Tesouro</span><br/>
                  Constituição Federal de 1988 estabelece competência constitucional exclusiva para arrecadação de tributos.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500">
                <div className="flex items-center mb-6">
                  <Shield className="h-10 w-10 text-red-600 mr-4" />
                  <h3 className="text-2xl font-bold text-red-600">Poder de Polícia</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  <span className="font-semibold">Exercido pelos Fiscais Municipais</span><br/>
                  Poder de polícia administrativo para fiscalização e aplicação de autos de infração.
                </p>
              </div>
            </div>

            {/* Card "Ponto Fundamental" - Destacado */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100 to-orange-100 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-8 shadow-xl">
                    <Scale className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
                    🎯 <span>Ponto Fundamental</span>
                  </h3>
                  
                  <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-8 rounded-full"></div>
                  
                  <p className="text-xl text-gray-800 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
                    A separação de competências <span className="font-bold text-amber-700">garante segurança jurídica</span>, 
                    <span className="font-bold text-orange-700"> eficiência administrativa</span> e 
                    <span className="font-bold text-amber-700"> proteção do interesse público</span>
                  </p>
                  
                  <div className="flex justify-center space-x-8 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                      <span className="font-medium">Segurança Jurídica</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span className="font-medium">Eficiência</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
                      <span className="font-medium">Interesse Público</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparativo Principal */}
        <section id="comparativo" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">📊 COMPARATIVO DE RECEITAS</h2>
              <p className="text-xl text-gray-600">Valores Reais do Orçamento 2025</p>
            </div>

            {/* Cards de destaque - GRANDES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-10 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <Users className="h-12 w-12" />
                  <span className="text-4xl font-bold">99.1%</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Receitas Tributárias</h3>
                <p className="text-3xl font-bold mb-2">R$ 568 milhões</p>
                <p className="text-blue-100 text-lg font-semibold">Auditores do Tesouro</p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-10 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <Shield className="h-12 w-12" />
                  <span className="text-4xl font-bold">0.9%</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Autos de Infração</h3>
                <p className="text-3xl font-bold mb-2">R$ 5.2 milhões</p>
                <p className="text-red-100 text-lg font-semibold">Fiscais Municipais</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-10 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <Scale className="h-12 w-12" />
                  <span className="text-4xl font-bold">109:1</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Proporção</h3>
                <p className="text-lg mb-2">Para cada R$ 1 em multas</p>
                <p className="text-green-100 text-lg font-semibold">R$ 109 em tributos</p>
              </div>
            </div>

            {/* Gráfico Comparativo */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-center mb-10">Comparativo Visual</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={comparativoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value} milhões`, 'Valor']} />
                  <Bar dataKey="valor" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Detalhamento das Carreiras */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Auditor do Tesouro */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                  <div className="flex items-center">
                    <Users className="h-12 w-12 mr-4" />
                    <div>
                      <h3 className="text-3xl font-bold">👨‍💼 AUDITOR DO TESOURO</h3>
                      <p className="text-blue-100 text-lg">Competência Tributária Exclusiva</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      ✅ COMPETÊNCIAS EXCLUSIVAS:
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        Lançamento de tributos (ISS, IPTU, ITBI, Taxa Lixo, demais Taxas)
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        A partir de 2026: lançamento do IBS
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        Constituição e revisão do crédito tributário
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        Aplicação e revogação de benefícios fiscais
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        Poder de decisão sobre créditos tributários
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        Gestão de créditos e cadastros tributários e rendas municipais
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        Responsabilidade pelo VAF-ICMS e pelo ITR
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                      💰 RESPONSABILIDADES FINANCEIRAS:
                    </h4>
                    <ul className="text-blue-800 space-y-2">
                      <li>• R$ 568 milhões em receitas tributárias</li>
                      <li>• 99,1% das receitas próprias</li>
                      <li>• VAF-ICMS: R$ 92 milhões</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fiscal Municipal */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8">
                  <div className="flex items-center">
                    <Shield className="h-12 w-12 mr-4" />
                    <div>
                      <h3 className="text-3xl font-bold">👮‍♂️ FISCAL MUNICIPAL</h3>
                      <p className="text-red-100 text-lg">Poder de Polícia Administrativo</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      ✅ COMPETÊNCIAS ESPECÍFICAS:
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">•</span>
                        Aplicação de Autos de Infração de poder de polícia
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">•</span>
                        Fiscalização de policiamento urbano
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">•</span>
                        Exercício do poder de polícia administrativo
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">•</span>
                        Controle de atividades econômicas
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">•</span>
                        Verificação de licenças
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-red-900 mb-3 flex items-center">
                      🚨 TIPOS DE AUTOS:
                    </h4>
                    <ul className="text-red-800 space-y-2 text-sm">
                      <li>• Obras e edificações</li>
                      <li>• Legislação de trânsito</li>
                      <li>• Meio ambiente</li>
                      <li>• Vigilância sanitária</li>
                      <li>• Posturas municipais</li>
                      <li>• Localização e Funcionamento</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-100 rounded-xl p-4 border-l-4 border-yellow-500">
                    <p className="text-yellow-800 font-medium text-sm">
                      ⚠️ <strong>Importante:</strong> Auto de infração não é tributo, é penalidade por ato ilícito e tem função corretiva e educativa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detalhamento Financeiro */}
        <section id="detalhes" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <FileText className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-6">💡 DETALHAMENTO FINANCEIRO</h2>
            </div>

            {/* Receitas Tributárias - Gráfico Pizza */}
            <div className="mb-16">
              <div className="bg-white rounded-2xl shadow-xl p-10">
                <h3 className="text-3xl font-bold text-center mb-10 text-blue-600">Receitas Tributárias - R$ 568 milhões</h3>
                <ResponsiveContainer width="100%" height={500}>
                  <PieChart>
                    <Pie
                      data={receitasDetalhadas}
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#3B82F6"
                      dataKey="valor"
                      label={({nome, percentual}) => `${nome}: ${percentual}%`}
                    >
                      {receitasDetalhadas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`R$ ${value} milhões`, 'Valor']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabela de Autos de Infração */}
            <div className="bg-white rounded-2xl shadow-xl p-10 mb-16">
              <h3 className="text-3xl font-bold text-center mb-10 text-red-600">Autos de Infração - R$ 5.2 milhões</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left font-bold text-gray-900">Tipo de Auto</th>
                      <th className="px-6 py-4 text-right font-bold text-gray-900">Valor (R$ mil)</th>
                      <th className="px-6 py-4 text-left font-bold text-gray-900">Base Legal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {autosInfracao.map((auto, index) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{auto.tipo}</td>
                        <td className="px-6 py-4 text-right font-mono">{auto.valor.toLocaleString('pt-BR')}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{auto.base}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Separação Clara das Responsabilidades - CARDS GRANDES */}
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-10 shadow-xl">
                <div className="text-center">
                  <Users className="h-20 w-20 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-6">Receitas Tributárias</h3>
                  <div className="text-5xl font-bold mb-4">R$ 568 milhões</div>
                  <div className="text-2xl font-semibold bg-white/20 rounded-xl py-3 px-6 mb-6">
                    Auditores do Tesouro
                  </div>
                  <p className="text-blue-100 text-lg">
                    Competência constitucional exclusiva para arrecadação de tributos
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-10 shadow-xl">
                <div className="text-center">
                  <Shield className="h-20 w-20 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-6">Autos de Infração</h3>
                  <div className="text-5xl font-bold mb-4">R$ 5.2 milhões</div>
                  <div className="text-2xl font-semibold bg-white/20 rounded-xl py-3 px-6 mb-6">
                    Fiscais Municipais
                  </div>
                  <p className="text-red-100 text-lg">
                    Poder de polícia administrativo para fiscalização e correção
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VAF-ICMS Destaque */}
        <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-5xl mx-auto">
                <DollarSign className="h-20 w-20 text-green-600 mx-auto mb-8" />
                <h2 className="text-4xl font-bold text-gray-900 mb-8">🏆 VAF-ICMS e ITR - DESTAQUE ESPECIAL</h2>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 mb-8">
                  <h3 className="text-3xl font-bold mb-4">VAF-ICMS: R$ 92 milhões</h3>
                  <p className="text-2xl">16,2% das receitas tributárias</p>
                  <p className="text-green-100 mt-3">+ ITR (Imposto Territorial Rural)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h4 className="font-bold text-green-600 mb-4 text-xl flex items-center">
                      ✅ CARACTERÍSTICAS:
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li>• Depende da fiscalização tributária</li>
                      <li>• Responsabilidade dos Auditores</li>
                      <li>• Impacto direto na receita</li>
                      <li>• Inclui gestão do ITR municipal</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-600 mb-4 text-xl flex items-center">
                      💎 IMPORTÂNCIA:
                    </h4>
                    <p className="text-gray-700 text-lg">
                      Quanto melhor a fiscalização tributária municipal, 
                      maior o VAF-ICMS recebido pelo município! A gestão 
                      do ITR também fortalece a arrecadação rural.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusão */}
        <section id="conclusao" className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Scale className="h-16 w-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">⚖️ CONCLUSÃO</h2>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 mb-12">
                <h3 className="text-3xl font-bold text-center mb-8 text-blue-400">
                  🎯 MENSAGEM FINAL COM DADOS REAIS
                </h3>
                
                <div className="space-y-6 text-xl text-center">
                  <p className="font-bold text-blue-300">
                    SOMENTE A AUTORIDADE TRIBUTÁRIA TEM PODER CONSTITUCIONAL E LEGAL PARA ARRECADAR TRIBUTOS
                  </p>
                  <p className="font-bold text-red-300">
                    OS FISCAIS MUNICIPAIS EXERCEM PODER DE POLÍCIA ATRAVÉS DE AUTOS DE INFRAÇÃO
                  </p>
                  <p className="font-bold text-green-300 text-3xl">
                    PROPORÇÃO REAL: 109:1 - RECEITAS TRIBUTÁRIAS vs AUTOS DE INFRAÇÃO
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-blue-600 rounded-xl p-6">
                  <Gavel className="h-10 w-10 mx-auto mb-3" />
                  <p className="font-semibold">Segurança Jurídica</p>
                </div>
                <div className="bg-green-600 rounded-xl p-6">
                  <TrendingUp className="h-10 w-10 mx-auto mb-3" />
                  <p className="font-semibold">Eficiência Administrativa</p>
                </div>
                <div className="bg-purple-600 rounded-xl p-6">
                  <Shield className="h-10 w-10 mx-auto mb-3" />
                  <p className="font-semibold">Interesse Público</p>
                </div>
                <div className="bg-red-600 rounded-xl p-6">
                  <Scale className="h-10 w-10 mx-auto mb-3" />
                  <p className="font-semibold">Mandamentos Constitucionais</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-3">Porto Velho - Rondônia</h3>
                <p className="text-gray-300 text-lg">Administração Tributária Municipal</p>
              </div>
              
              <div className="border-t border-gray-700 pt-10">
                <p className="text-gray-400 mb-6 italic">
                  Esta cartilha foi elaborada com base nos dados reais do PLOA 2025 e tem caráter meramente informativo.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs text-gray-500">
                  <div>Constituição Federal de 1988</div>
                  <div>Código Tributário Nacional</div>
                  <div>Código Tributário Municipal</div>
                  <div>Códigos Municipais</div>
                  <div>PLOA 2025 - Dados Oficiais</div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CartilhaWebInterativa;
