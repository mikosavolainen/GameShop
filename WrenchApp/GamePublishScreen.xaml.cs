using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using WrenchApp.Pages;
using System.IO;

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
            OpenFileDialog dlg = new OpenFileDialog
            {
                Filter = "Compressed files (*.zip, *.rar, *.7z)|*.zip;*.rar;*.7z|All files (*.*)|*.*"
            };

            bool? result = dlg.ShowDialog();
            if (result == true)
            {
                // Get the selected file path
                string filePath = dlg.FileName;
                selectedfolder.Text = filePath;
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

        private async void ConfirmButton_Click(object sender, RoutedEventArgs e)
        {
            var formContent = new MultipartFormDataContent();

            // Add form fields
            formContent.Add(new StringContent(gametitle.Text), "name");
            formContent.Add(new StringContent(new TextRange(gamedesc.Document.ContentStart, gamedesc.Document.ContentEnd).Text), "desc");
            formContent.Add(new StringContent(ConfigurationManager.AppSettings["username"]), "author");
            formContent.Add(new StringContent(tags.Text), "category");
            formContent.Add(new StringContent(price.Text), "price");
            formContent.Add(new StringContent(ismultiplayer.IsChecked.ToString().ToLower()), "multiplayer");
            formContent.Add(new StringContent(ConfigurationManager.AppSettings["JWT"]), "token");

            // Get game and image file path
            string filePath = selectedfolder.Text;
            string imagePath = selectedimg.Text;

            // Ensure that all data is given
            bool IsValidFilePath(string path) => !string.IsNullOrWhiteSpace(path) && File.Exists(path);
            bool IsValidTextBox(TextBox textBox) => !string.IsNullOrWhiteSpace(textBox.Text);
            bool IsValidDescription(RichTextBox descriptionBox) => !string.IsNullOrWhiteSpace(new TextRange(descriptionBox.Document.ContentStart, descriptionBox.Document.ContentEnd).Text);

            if (IsValidFilePath(filePath) && IsValidFilePath(imagePath) &&
                IsValidTextBox(gametitle) && IsValidDescription(gamedesc) &&
                IsValidTextBox(tags) && IsValidTextBox(price))
            {
                // Get file data
                var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                var fileContent = new StreamContent(fileStream);
                fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
                formContent.Add(fileContent, "gamefile", System.IO.Path.GetFileName(filePath));

                // Get image data
                var imageStream = new FileStream(imagePath, FileMode.Open, FileAccess.Read);
                var imageContent = new StreamContent(imageStream);
                imageContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
                formContent.Add(imageContent, "images", System.IO.Path.GetFileName(imagePath));

                // Attempt to publish game
                using (HttpClient httpClient = new HttpClient())
                {
                    HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"]}/upload-game", formContent);

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Game uploaded successfully!");
                        this.Close();
                    }
                    else
                    {
                        MessageBox.Show($"Upload failed: {await response.Content.ReadAsStringAsync()}");
                    }
                }
            }
            else
            {
                MessageBox.Show("Please fill out all forms");
            }
        }
    }
}
