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
            
            {/* REMOVIDO O MENU FIXO - só fica o hambúrguer */}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-blue-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menu dropdown - só aparece quando isMenuOpen é true */}
        {isMenuOpen && (
          <div className="bg-white border-t border-blue-100 shadow-lg">
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
        <section id="inicio" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
              CARTILHA ILUSTRATIVA
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
              AUDITORES DO TESOURO vs FISCAIS MUNICIPAIS
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Entenda as Diferenças e Competências - VALORES REAIS ATUALIZADOS
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-blue-200 text-sm">Município</p>
                  <p className="font-bold">Porto Velho - RO</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Data</p>
                  <p className="font-bold">Junho de 2025</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Fonte</p>
                  <p className="font-bold">PLOA 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objetivo */}
        <section id="objetivo" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Info className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 OBJETIVO DESTA CARTILHA</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
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
        <section id="constitucional" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Gavel className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">⚖️ FUNDAMENTO CONSTITUCIONAL</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-blue-600">Competência Tributária</h3>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Exclusiva dos Auditores do Tesouro</span><br/>
                  Constituição Federal de 1988 estabelece competência constitucional exclusiva para arrecadação de tributos.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-red-600">Poder de Polícia</h3>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Exercido pelos Fiscais Municipais</span><br/>
                  Poder de polícia administrativo para fiscalização e aplicação de autos de infração.
                </p>
              </div>
            </div>

            {/* Card Chamativo - Ponto Fundamental */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100 to-orange-100 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6 shadow-lg">
                    <Scale className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                    🎯 <span>Ponto Fundamental</span>
                  </h3>
                  
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
                  
                  <p className="text-lg text-gray-800 leading-relaxed font-medium max-w-2xl mx-auto">
                    A separação de competências <span className="font-bold text-amber-700">garante segurança jurídica</span>, 
                    <span className="font-bold text-orange-700"> eficiência administrativa</span> e 
                    <span className="font-bold text-amber-700"> proteção do interesse público</span>
                  </p>
                  
                  <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="font-medium">Segurança Jurídica</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="font-medium">Eficiência</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                      <span className="font-medium">Interesse Público</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparativo Principal */}
        <section id="comparativo" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">📊 COMPARATIVO DE RECEITAS</h2>
              <p className="text-xl text-gray-600">Valores Reais do Orçamento 2025</p>
            </div>

            {/* Cards de destaque */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div style={{
                background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)',
                color: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-10 w-10" />
                  <span className="text-3xl font-bold">99.1%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Receitas Tributárias</h3>
                <p className="text-2xl font-bold">R$ 568 milhões</p>
                <p style={{ color: '#dbeafe' }} className="mt-2 font-semibold">Auditores do Tesouro</p>
              </div>

              <div style={{
                background: 'linear-gradient(to bottom right, #ef4444, #dc2626)',
                color: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="flex items-center justify-between mb-4">
                  <Shield className="h-10 w-10" />
                  <span className="text-3xl font-bold">0.9%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Autos de Infração</h3>
                <p className="text-2xl font-bold">R$ 5.2 milhões</p>
                <p style={{ color: '#fca5a5' }} className="mt-2 font-semibold">Fiscais Municipais</p>
              </div>

              <div style={{
                background: 'linear-gradient(to bottom right, #22c55e, #16a34a)',
                color: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="flex items-center justify-between mb-4">
                  <Scale className="h-10 w-10" />
                  <span className="text-3xl font-bold">109:1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Proporção</h3>
                <p className="text-lg">Para cada R$ 1 em multas</p>
                <p style={{ color: '#dcfce7' }} className="mt-2">R$ 109 em tributos</p>
              </div>
            </div>

            {/* Gráfico Comparativo */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-center mb-8">Comparativo Visual</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparativoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value} milhões`, 'Valor']} />
                  <Bar dataKey="valor" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Detalhamento das Carreiras */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Auditor do Tesouro */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div style={{
                  background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                  color: 'white',
                  padding: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Users style={{ height: '2.5rem', width: '2.5rem', marginRight: '1rem' }} />
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>👨‍💼 AUDITOR DO TESOURO</h3>
                      <p style={{ color: '#dbeafe', margin: 0, fontSize: '1rem' }}>Competência Tributária Exclusiva</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">✅ COMPETÊNCIAS EXCLUSIVAS:</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#3b82f6', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Lançamento de tributos (ISS, IPTU, ITBI, Taxa Lixo, demais Taxas)
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#3b82f6', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        A partir de 2026: lançamento do IBS
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#3b82f6', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Constituição e revisão do crédito tributário
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#3b82f6', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Aplicação e revogação de benefícios fiscais
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#3b82f6', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Poder de decisão sobre créditos tributários
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#3b82f6', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Gestão de créditos e cadastros tributários e rendas municipais
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#3b82f6', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Responsabilidade pelo VAF-ICMS e pelo ITR
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-bold text-blue-900 mb-2">💰 RESPONSABILIDADES FINANCEIRAS:</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ color: '#1e40af', marginBottom: '0.25rem' }}>• R$ 568 milhões em receitas tributárias</li>
                      <li style={{ color: '#1e40af', marginBottom: '0.25rem' }}>• 99,1% das receitas próprias</li>
                      <li style={{ color: '#1e40af', marginBottom: '0.25rem' }}>• VAF-ICMS: R$ 92 milhões</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fiscal Municipal */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div style={{
                  background: 'linear-gradient(to right, #ef4444, #dc2626)',
                  color: 'white',
                  padding: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Shield style={{ height: '2.5rem', width: '2.5rem', marginRight: '1rem' }} />
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>👮‍♂️ FISCAL MUNICIPAL</h3>
                      <p style={{ color: '#fca5a5', margin: 0, fontSize: '1rem' }}>Poder de Polícia Administrativo</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">✅ COMPETÊNCIAS ESPECÍFICAS:</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#ef4444', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Aplicação de Autos de Infração de poder de polícia
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#ef4444', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Fiscalização de policiamento urbano
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#ef4444', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Exercício do poder de polícia administrativo
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#ef4444', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Controle de atividades econômicas
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: '#374151' }}>
                        <span style={{ color: '#ef4444', marginRight: '0.5rem', marginTop: '0.1rem' }}>•</span>
                        Verificação de licenças
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 mb-6">
                    <h4 className="font-bold text-red-900 mb-2">🚨 TIPOS DE AUTOS:</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ color: '#dc2626', marginBottom: '0.25rem', fontSize: '0.875rem' }}>• Obras e edificações</li>
                      <li style={{ color: '#dc2626', marginBottom: '0.25rem', fontSize: '0.875rem' }}>• Legislação de trânsito</li>
                      <li style={{ color: '#dc2626', marginBottom: '0.25rem', fontSize: '0.875rem' }}>• Meio ambiente</li>
                      <li style={{ color: '#dc2626', marginBottom: '0.25rem', fontSize: '0.875rem' }}>• Vigilância sanitária</li>
                      <li style={{ color: '#dc2626', marginBottom: '0.25rem', fontSize: '0.875rem' }}>• Posturas municipais</li>
                      <li style={{ color: '#dc2626', marginBottom: '0.25rem', fontSize: '0.875rem' }}>• Localização e Funcionamento</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-100 rounded-lg p-4 border-l-4 border-yellow-500">
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
        <section id="detalhes" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">💡 DETALHAMENTO FINANCEIRO</h2>
            </div>

            {/* Receitas Tributárias Detalhadas */}
            <div className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">Receitas Tributárias - R$ 568 milhões</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={receitasDetalhadas}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
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
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-red-600">Autos de Infração - R$ 5.2 milhões</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left font-semibold">Tipo de Auto</th>
                      <th className="px-4 py-3 text-right font-semibold">Valor (R$ mil)</th>
                      <th className="px-4 py-3 text-left font-semibold">Base Legal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {autosInfracao.map((auto, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-3 font-medium">{auto.tipo}</td>
                        <td className="px-4 py-3 text-right font-mono">{auto.valor.toLocaleString('pt-BR')}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{auto.base}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Separação Clara das Responsabilidades */}
            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <div style={{
                background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)',
                color: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="text-center">
                  <Users className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Receitas Tributárias</h3>
                  <div className="text-4xl font-bold mb-2">R$ 568 milhões</div>
                  <div className="text-xl font-semibold bg-white/20 rounded-lg py-2 px-4">
                    Auditores do Tesouro
                  </div>
                  <p className="mt-4" style={{ color: '#dbeafe' }}>
                    Competência constitucional exclusiva para arrecadação de tributos
                  </p>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(to bottom right, #ef4444, #dc2626)',
                color: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="text-center">
                  <Shield className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Autos de Infração</h3>
                  <div className="text-4xl font-bold mb-2">R$ 5.2 milhões</div>
                  <div className="text-xl font-semibold bg-white/20 rounded-lg py-2 px-4">
                    Fiscais Municipais
                  </div>
                  <p className="mt-4" style={{ color: '#fca5a5' }}>
                    Poder de polícia administrativo para fiscalização e correção
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VAF-ICMS Destaque */}
        <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
                <DollarSign className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🏆 VAF-ICMS e ITR - DESTAQUE ESPECIAL</h2>
                
                <div style={{
                  background: 'linear-gradient(to right, #22c55e, #16a34a)',
                  color: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <h3 className="text-2xl font-bold mb-2">VAF-ICMS: R$ 92 milhões</h3>
                  <p className="text-lg">16,2% das receitas tributárias</p>
                  <p style={{ color: '#dcfce7' }} className="text-sm mt-2">+ ITR (Imposto Territorial Rural)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-bold text-green-600 mb-3">✅ CARACTERÍSTICAS:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Depende da fiscalização tributária</li>
                      <li>• Responsabilidade dos Auditores</li>
                      <li>• Impacto direto na receita</li>
                      <li>• Inclui gestão do ITR municipal</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-600 mb-3">💎 IMPORTÂNCIA:</h4>
                    <p className="text-gray-700">
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
        <section id="conclusao" className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Scale className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">⚖️ CONCLUSÃO</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-center mb-6 text-blue-400">
                  🎯 MENSAGEM FINAL COM DADOS REAIS
                </h3>
                
                <div className="space-y-4 text-lg text-center">
                  <p className="font-bold text-blue-300">
                    SOMENTE A AUTORIDADE TRIBUTÁRIA TEM PODER CONSTITUCIONAL E LEGAL PARA ARRECADAR TRIBUTOS
                  </p>
                  <p className="font-bold text-red-300">
                    OS FISCAIS MUNICIPAIS EXERCEM PODER DE POLÍCIA ATRAVÉS DE AUTOS DE INFRAÇÃO
                  </p>
                  <p className="font-bold text-green-300 text-2xl">
                    PROPORÇÃO REAL: 109:1 - RECEITAS TRIBUTÁRIAS vs AUTOS DE INFRAÇÃO
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div style={{
                  background: '#3b82f6',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <Gavel className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold">Segurança Jurídica</p>
                </div>
                <div style={{
                  background: '#22c55e',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold">Eficiência Administrativa</p>
                </div>
                <div style={{
                  background: '#9333ea',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <Shield className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold">Interesse Público</p>
                </div>
                <div style={{
                  background: '#dc2626',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <Scale className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold">Mandamentos Constitucionais</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Porto Velho - Rondônia</h3>
                <p className="text-gray-300">Administração Tributária Municipal</p>
              </div>
              
              <div className="border-t border-gray-700 pt-8">
                <p className="text-sm text-gray-400 mb-4">
                  <em>Esta cartilha foi elaborada com base nos dados reais do PLOA 2025 e tem caráter meramente informativo.</em>
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
