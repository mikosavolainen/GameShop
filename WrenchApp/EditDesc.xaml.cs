using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace WrenchApp
{
    /// <summary>
    /// Interaction logic for EditDesc.xaml
    /// </summary>
    public partial class EditDesc : Window
    {
        public string InputText { get; private set; }
        public EditDesc()
        {
            InitializeComponent();
        }

        private void OkButton_Click(object sender, RoutedEventArgs e)
        {
            InputText = new TextRange(InputTextBox.Document.ContentStart, InputTextBox.Document.ContentEnd).Text;
            DialogResult = true;
            Close();
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
            Close();
        }
    }
}
