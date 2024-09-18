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
using WrenchApp.Pages;

namespace WrenchApp
{
    /// <summary>
    /// Interaction logic for GamePublishScreen.xaml
    /// </summary>
    public partial class GamePublishScreen : Window
    {
        public GamePublishScreen()
        {
            InitializeComponent();
        }

        private void Drag_Screen(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
            {
                this.DragMove();
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBoxResult anwser = MessageBox.Show("Are you sure you want to cancel?", "", MessageBoxButton.YesNo);
            
            if (anwser == MessageBoxResult.Yes)
            {
                this.Close();
            }
        }

        private void selectfolder(object sender, RoutedEventArgs e)
        {
            Microsoft.Win32.OpenFileDialog dlg = new Microsoft.Win32.OpenFileDialog();
            dlg.Filter = "Compressed files (*.zip, *.rar, *.7z)|*.zip;*.rar;*.7z|All files (*.*)|*.*";

            Nullable<bool> result = dlg.ShowDialog();

            if (result == true)
            {
                selectedfolder.Text = dlg.FileName;
            }
        }

        private void selectimg(object sender, RoutedEventArgs e)
        {
            Microsoft.Win32.OpenFileDialog dlg = new Microsoft.Win32.OpenFileDialog();
            dlg.Filter = "Image files (*.jpg, *.png)|*.jpg;*.png|All files (*.*)|*.*";

            Nullable<bool> result = dlg.ShowDialog();

            if (result == true)
            {
                selectedimg.Text = dlg.FileName;
                previewimage.Source = new BitmapImage(new Uri(dlg.FileName));
            }
        }

        private void ChangePreviewTitle(object sender, RoutedEventArgs e)
        {
            previewtitle.Text = gametitle.Text;
        }
    }
}
